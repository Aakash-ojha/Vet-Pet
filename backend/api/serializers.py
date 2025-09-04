from rest_framework import serializers
from .models import PetOwner, VeterinaryDoctor, Animal, Consultation

class PetOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetOwner
        fields = '__all__'

class VeterinaryDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VeterinaryDoctor
        fields = '__all__'

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'
