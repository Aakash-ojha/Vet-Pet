from rest_framework import serializers
from .models import Pet, Doctor, DoctorAvailability, Appointment
from django.utils import timezone



class PetSerializer(serializers.ModelSerializer):
    total_appointments = serializers.SerializerMethodField()

    class Meta:
        model = Pet
        fields = '__all__'

    def get_total_appointments(self, pet):
        return Appointment.objects.filter(pet=pet).count()

class DoctorSerializer(serializers.ModelSerializer):
    total_appointments = serializers.SerializerMethodField()
    upcoming_appointments = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = '__all__'

    def get_total_appointments(self, doctor):
        return Appointment.objects.filter(doctor=doctor).count()

    def get_upcoming_appointments(self, doctor):
        return Appointment.objects.filter(
            doctor=doctor, appointment_time__gte=timezone.now()
        ).count()

class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    # image = serializers.ImageField(read_only=True)
    
    class Meta:
        model = DoctorAvailability
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    # Existing fields
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), source='doctor', write_only=True)
    availability = DoctorAvailabilitySerializer(read_only=True)  # <-- Add this

    # New fields for creating a pet
    pet_name = serializers.CharField(write_only=True, required=False)
    pet_age = serializers.IntegerField(write_only=True, required=False)
    pet_type = serializers.CharField(write_only=True, required=False)
    pet_condition = serializers.CharField(write_only=True, required=False)
    pet_image = serializers.ImageField(write_only=True, required=False)

    pet = PetSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True) 
  
    is_upcoming = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        # Extract pet data from the request
        pet_data = {}
        for field in ['pet_name', 'pet_age', 'pet_type', 'pet_condition', 'pet_image']:
            if field in validated_data:
                key = field.replace('pet_', '')  # match Pet model fields
                pet_data[key] = validated_data.pop(field)

        # Create pet if data exists
        pet = None
        if pet_data.get('name'):
            pet = Pet.objects.create(**pet_data)

        # Create appointment
        appointment = Appointment.objects.create(
            pet=pet,
            **validated_data
        )
        return appointment

    def get_is_upcoming(self, appointment):
        return appointment.appointment_time >= timezone.now()

    def get_doctor(self, obj):
        return {"id": obj.doctor.id, "name": obj.doctor.name}



    pet_id = serializers.PrimaryKeyRelatedField(queryset=Pet.objects.all(), source='pet', write_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), source='doctor', write_only=True)
    

    pet = PetSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
   
    is_upcoming = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = '__all__'

    def get_is_upcoming(self, appointment):
        return appointment.appointment_time >= timezone.now()

