from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .models import Product, Cart, CartItem,Transaction
from .serializers import ProductSerializer,DetailedProductSerializer,CartItemSerializer,UserSerializer,SimpleCartSerializer,CartSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.conf import settings

import hmac
import hashlib
import base64
from uuid import uuid4
from decimal import Decimal




from .models import Cart, Transaction

BASE_URL = "http://yourdomain.com"  # Change this to your actual base URL

# Create your views here.
BASE_URL='http://localhost:5173'

from rest_framework.response import Response
@api_view(["GET"])
def products(request):
    products= Product.objects.all()
    serializer = ProductSerializer(products,many=True)

    return Response(serializer.data)


@api_view(["GET"])
def product_detail(request, slug):
    try:
        product = get_object_or_404(Product, slug=slug)
        serializer = DetailedProductSerializer(product)

        # similar products in the same category 
        similar_products = Product.objects.filter(category=product.category).exclude(id=product.id)[:4]
        similar_serializer = ProductSerializer(similar_products, many=True)

        return Response({
            "product": serializer.data,
            "similar_products": similar_serializer.data
        })

    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(["POST"])

def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")
        cart, created = Cart.objects.get_or_create(cart_code = cart_code)
        product = Product.objects.get(id=product_id)

        cartitem, created = CartItem.objects.get_or_create(cart=cart,product=product)
        cartitem.quantity=1
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({"data":serializer.data,"message":"Cartitem created sucessfully"},status=201)

    except Exception as e:
        return Response({"error":str(e)},status=400)

@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    return Response({'product_in_cart':product_exists_in_cart})


@api_view(['Get'])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code ,paid=False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)



@api_view(['Get'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code ,paid=False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['PATCH'])
def update_quantity(request):
    try:
        cartitem_id = request.data.get("item_id")
        quantity = request.data.get("quantity")
        quantity = int(quantity)

        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({
            "data": serializer.data,
            "message": "Cartitem updated successfully!"
        })

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

@api_view(['POST'])
def delete_cartitem(request):
        cartitem_id = request.data.get("item_id")
        cartitem= CartItem.objects.get(id=cartitem_id)
        cartitem.delete()
        return Response({"message":"Item deleted sucessfully"},status=status.HTTP_204_NO_CONTENT)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username": user.username})






@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer=UserSerializer(user)
    return Response(serializer.data)


def generate_signature(data_string):
    secret_key = settings.ESEWA_SECRET_KEY  # Your secret key here (string)
    hashed = hmac.new(
        key=secret_key.encode('utf-8'),
        msg=data_string.encode('utf-8'),
        digestmod=hashlib.sha256
    )
    return base64.b64encode(hashed.digest()).decode('utf-8')


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def initial_payment(request):
    user = request.user
    try:
        cart_code = request.data.get('cart_code')
        if not cart_code:
            return Response({"error": "cart_code is required"}, status=400)

        cart = Cart.objects.get(cart_code=cart_code)

        amount = sum([item.quantity * item.product.price for item in cart.items.all()])
        tax_amount = Decimal('4.00')  # or get dynamically
        product_service_charge = Decimal('0')
        product_delivery_charge = Decimal('0')

        total_amount = amount + tax_amount + product_service_charge + product_delivery_charge

        transaction_uuid = str(uuid4())
        product_code = "EPAYTEST"
        success_url = f"{BASE_URL}/payment-success"
        failure_url = f"{BASE_URL}/payment-failure"

        # Save transaction record
        transaction = Transaction.objects.create(
            ref=transaction_uuid,
            cart=cart,
            amount=total_amount,
            currency="NPR",
            user=user,
            status='pending'
        )

        # Signed fields in exact order and format required by eSewa
        signed_field_names = "total_amount,transaction_uuid,product_code"
        data_string = f"total_amount={total_amount},transaction_uuid={transaction_uuid},product_code={product_code}"

        signature = generate_signature(data_string)

        esewa_payload = {
            "amount": str(amount),
            "tax_amount": str(tax_amount),
            "total_amount": str(total_amount),
            "transaction_uuid": transaction_uuid,
            "product_code": product_code,
            "product_service_charge": str(product_service_charge),
            "product_delivery_charge": str(product_delivery_charge),
            "success_url": success_url,
            "failure_url": failure_url,
            "signed_field_names": signed_field_names,
            "signature": signature,
        }

        return Response({
            "message": "Payment initialized successfully",
            "payment_url": "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
            "payment_data": esewa_payload
        })

    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

