from django.db import models
from django.conf import settings
from django.utils import timezone
import datetime 
from datetime import date


# 🐾 Pet Model
class Pet(models.Model):
    ANIMAL_TYPES = [
        ('dog', 'Dog'),
        ('cat', 'Cat'),
        ('hen', 'Hen'),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True
    )
    name = models.CharField(max_length=100)
    species = models.CharField(
        max_length=50, 
        choices=ANIMAL_TYPES, 
        default='dog'
    )
    age = models.IntegerField()
    condition = models.TextField(blank=True, null=True)  
    image = models.ImageField(upload_to='pet_images/', blank=True, null=True)
   

    def __str__(self):
        return f'{self.name} ({self.species})'


# 🩺 Doctor Model
class Doctor(models.Model):
    DOCTOR_TYPES = [
        ('vet', 'Veterinarian'),
        ('surgeon', 'Surgeon'),
        ('assistant', 'Assistant'),
    ]

    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    age = models.IntegerField()
    specialty = models.CharField(max_length=100)
    image = models.ImageField(upload_to='doctor_images/', blank=True, null=True)
    is_available = models.BooleanField(default=True,) 

    doctor_type = models.CharField(
        max_length=20, 
        choices=DOCTOR_TYPES, 
        default='vet'
    )
    
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)

    def __str__(self):
        return f'Dr. {self.name} ({self.doctor_type})'



class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="availabilities")
    date = models.DateField(default=date.today)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.doctor.name} - {self.date} {self.start_time}-{self.end_time}"



# 📅 Appointment Model


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments',
        null=True,        # allow null for old appointments
        blank=True,
    )
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)

    availability = models.ForeignKey(
        'DoctorAvailability',
        on_delete=models.SET_NULL,
        related_name='appointments',
        null=True,
        blank=True,
    )

    appointment_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Appointment for {self.pet.name} with Dr. {self.doctor.name} ({self.status})'

    def save(self, *args, **kwargs):
        # Ensure appointment_time is the same as availability if provided
        if self.availability and not self.appointment_time:
            self.appointment_time = timezone.make_aware(
                datetime.datetime.combine(self.availability.date, self.availability.start_time)
            )
        super().save(*args, **kwargs)