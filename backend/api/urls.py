from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetOwnerViewSet, VeterinaryDoctorViewSet, AnimalViewSet, ConsultationViewSet

router = DefaultRouter()
router.register(r'owners', PetOwnerViewSet)
router.register(r'doctors', VeterinaryDoctorViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'consultations', ConsultationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
