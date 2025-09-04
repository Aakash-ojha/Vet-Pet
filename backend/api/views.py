from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import PetOwner, VeterinaryDoctor, Animal, Consultation
from .serializers import (
    PetOwnerSerializer,
    VeterinaryDoctorSerializer,
    AnimalSerializer,
    ConsultationSerializer,
)

class PetOwnerViewSet(viewsets.ModelViewSet):
    queryset = PetOwner.objects.all()
    serializer_class = PetOwnerSerializer

class VeterinaryDoctorViewSet(viewsets.ModelViewSet):
    queryset = VeterinaryDoctor.objects.all()
    serializer_class = VeterinaryDoctorSerializer

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

