from django.db import models

# Create your models here.
# To update database after model changes:
# python manage.py makemigrations api
# python manage.py migrate



class PetOwner(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.name



class VeterinaryDoctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    image = models.ImageField(upload_to='doctor_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class Animal(models.Model):
    owner = models.ForeignKey(PetOwner, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50)  # e.g. Dog, Cat, Cow
    breed = models.CharField(max_length=50, blank=True, null=True)
    age = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.species})"

class Consultation(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    vet = models.ForeignKey(VeterinaryDoctor, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    diagnosis = models.TextField(blank=True, null=True)
    treatment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Consultation for {self.animal.name} on {self.date.strftime('%Y-%m-%d')}"

