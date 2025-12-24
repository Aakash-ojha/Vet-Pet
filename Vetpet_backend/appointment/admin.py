from django.contrib import admin
from .models import Pet, Doctor, DoctorAvailability, Appointment

admin.site.register(Pet)
admin.site.register(Doctor)

admin.site.register(Appointment)
admin.site.register(DoctorAvailability)
