"""
URL configuration for clinic_project.

API Endpoints:
    GET    /api/doctors/            - List all doctors
    POST   /api/doctors/            - Create a new doctor
    GET    /api/doctors/{id}/       - Retrieve a doctora
    PUT    /api/doctors/{id}/       - Update a doctor
    DELETE /api/doctors/{id}/       - Delete a doctor

    GET    /api/patients/           - List all patients
    POST   /api/patients/           - Create a new patient
    GET    /api/patients/{id}/      - Retrieve a patient
    PUT    /api/patients/{id}/      - Update a patient
    DELETE /api/patients/{id}/      - Delete a patient

    GET    /api/appointments/       - List all appointments
    POST   /api/appointments/       - Create a new appointment
    GET    /api/appointments/{id}/  - Retrieve an appointment
    PUT    /api/appointments/{id}/  - Update an appointment
    DELETE /api/appointments/{id}/  - Delete an appointment
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('appointments.urls')),
]
