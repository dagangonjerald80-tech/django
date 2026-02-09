"""
URL routing for the appointments app.
Uses DRF DefaultRouter to automatically generate URL patterns
for all CRUD operations on each ViewSet.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# DRF Router auto-generates URL patterns for ViewSets:
#   /doctors/          -> list, create
#   /doctors/{pk}/     -> retrieve, update, destroy
#   /patients/         -> list, create
#   /patients/{pk}/    -> retrieve, update, destroy
#   /appointments/     -> list, create
#   /appointments/{pk}/ -> retrieve, update, destroy

router = DefaultRouter()
router.register(r'doctors', views.DoctorViewSet)
router.register(r'patients', views.PatientViewSet)
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
