from django.contrib import admin

# makemigrations: Generate migration files (instructions)
# migrate: Apply those instructions to your database (create/update tables)
# python manage.py makemigrations api
# python manage.py migrate


# Register your models here.
from .models import PetOwner, VeterinaryDoctor, Animal, Consultation

admin.site.register(PetOwner)
admin.site.register(VeterinaryDoctor)
admin.site.register(Animal)
admin.site.register(Consultation)
