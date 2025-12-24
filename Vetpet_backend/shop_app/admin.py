from django.contrib import admin
from .models import Product, Cart, CartItem, Transaction


# -------------------------------
# Product Admin
# -------------------------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'slug')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)
    list_per_page = 20


# -------------------------------
# Cart Admin
# -------------------------------
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('cart_code', 'user', 'paid', 'created_at', 'modified_at')
    list_filter = ('paid', 'created_at')
    search_fields = ('cart_code', 'user__username')
    readonly_fields = ('created_at', 'modified_at')
    ordering = ('-created_at',)


# -------------------------------
# CartItem Admin
# -------------------------------
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    list_filter = ('cart', 'product')
    search_fields = ('cart__cart_code', 'product__name')
    ordering = ('cart',)


# -------------------------------
# Transaction Admin
# -------------------------------
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('ref', 'cart', 'user', 'amount', 'currency', 'status', 'created_at')
    list_filter = ('status', 'currency', 'created_at')
    search_fields = ('ref', 'cart__cart_code', 'user__username')
    readonly_fields = ('created_at', 'modified_at')
    ordering = ('-created_at',)
