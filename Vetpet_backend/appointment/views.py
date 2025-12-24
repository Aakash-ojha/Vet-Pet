from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from uuid import uuid4

from .models import Appointment, Pet, Doctor, DoctorAvailability
from .serializers import (
    AppointmentSerializer, 
    PetSerializer, 
    DoctorSerializer, 
    DoctorAvailabilitySerializer
)

BASE_URL = "http://localhost:5173"  # Frontend base URL

# -----------------------------
# APPOINTMENTS
# -----------------------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_appointments(request):
    appointments = Appointment.objects.all()
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_appointment_detail(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)
    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([AllowAny])
def create_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Appointment created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# -----------------------------
# DOCTORS
# -----------------------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_doctor_detail(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    serializer = DoctorSerializer(doctor)
    return Response(serializer.data)

# -----------------------------
# PETS
# -----------------------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_pets(request):
    pets = Pet.objects.all()
    serializer = PetSerializer(pets, many=True)
    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_pets(request):
    pets = Pet.objects.filter(owner=request.user)
    serializer = PetSerializer(pets, many=True)
    return Response(serializer.data)


# -----------------------------
# DOCTOR AVAILABILITY
# -----------------------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_doctor_slots(request, doctor_id):
    slots = DoctorAvailability.objects.filter(
        doctor_id=doctor_id,
        is_booked=False,
        date__gte=timezone.now().date()
    ).order_by("date", "start_time")
    serializer = DoctorAvailabilitySerializer(slots, many=True)
    return Response(serializer.data)

from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Appointment, Pet, DoctorAvailability

@api_view(["POST"])
@permission_classes([AllowAny])
def book_appointment(request):
    try:
        # Get slot
        slot_id = request.data.get("slot_id")
        if not slot_id:
            return Response({"error": "slot_id is required"}, status=400)

        slot = get_object_or_404(DoctorAvailability, id=slot_id, is_booked=False)

        # Handle pet creation
        pet_id = request.data.get("pet_id")
        if pet_id:
            pet = get_object_or_404(Pet, id=pet_id)
        else:
            pet_data = {
                "name": request.data.get("pet_name"),
                "age": request.data.get("pet_age"),
                "species": request.data.get("pet_type"),
                "condition": request.data.get("pet_condition", ""),
            }
            if "pet_image" in request.FILES:
                pet_data["image"] = request.FILES["pet_image"]

            if request.user.is_authenticated:
                pet_data["owner"] = request.user

            pet = Pet.objects.create(**pet_data)

        # Create appointment
        appointment = Appointment.objects.create(
            pet=pet,
            doctor=slot.doctor,
            availability=slot,
            appointment_time=timezone.make_aware(
                timezone.datetime.combine(slot.date, slot.start_time)
            ),
            user=request.user if request.user.is_authenticated else None,
        )

        # Mark slot as booked
        slot.is_booked = True
        slot.save()

        return Response({
            "message": "Appointment booked successfully",
            "appointment_id": appointment.id,
            "appointment_time": appointment.appointment_time,
        }, status=status.HTTP_201_CREATED)

    except DoctorAvailability.DoesNotExist:
        return Response({"error": "Slot not available"}, status=400)
    except Pet.DoesNotExist:
        return Response({"error": "Pet not found"}, status=400)
    except Exception as e:
        # 💡 IMPORTANT: Log the error to your Django console for debugging!
        print(f"Appointment Booking Error: {e}")
        
        # Return a generic 500 or 400 error message
        return Response({"error": "Failed to create pet or appointment. Details logged on server."}, status=400)

    