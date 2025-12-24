# from django.urls import path
# from . import views

# urlpatterns = [
#     # Appointments
#     path("appointments/", views.get_appointments, name="get_appointments"),
#     path("appointments/create/", views.create_appointment, name="create_appointment"),

#     # Pets
#     path("pets/", views.get_pets, name="get_pets"),
#     path("pets/create/", views.create_pet, name="create_pet"),  # Make sure create_pet exists in views

#     # Doctors
#     path("doctors/", views.get_doctors, name="get_doctors"),
#     path("doctors/<int:doctor_id>/", views.get_doctor_detail, name="get_doctor_detail"), 
#     path("doctors/create/", views.create_doctor, name="create_doctor"),  # Make sure create_doctor exists

#     # Treatments
#     path("treatments/", views.get_treatments, name="get_treatments"),
#     path("treatments/create/", views.create_treatment, name="create_treatment"),  # Make sure create_treatment exists

#     # Doctor Availability
#     path("availability/doctor/<int:doctor_id>/", views.get_doctor_slots, name="get_doctor_slots"),
#     path("availability/book/", views.book_appointment, name="book_appointment"),  # Matches view name
# ]


from django.urls import path
from . import views

urlpatterns = [
    # Appointments
    path("appointments/", views.get_appointments, name="get_appointments"),
    path("appointments/<int:appointment_id>/", views.get_appointment_detail, name="get_appointment_detail"),
    path("appointments/create/", views.create_appointment, name="create_appointment"),  # Optional if you allow manual creation

    # Doctors
    path("doctors/", views.get_doctors, name="get_doctors"),
    path("doctors/<int:doctor_id>/", views.get_doctor_detail, name="get_doctor_detail"),

   

    # Pets
    path("pets/", views.get_pets, name="get_pets"),  # Only GET; no create needed
    path("pets/user/", views.get_user_pets),  # filtered by owner

    # Doctor Availability & Booking
    path("availability/doctor/<int:doctor_id>/", views.get_doctor_slots, name="get_doctor_slots"),
    path("availability/book/", views.book_appointment, name="book_appointment"),
]
