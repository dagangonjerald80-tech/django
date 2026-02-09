"""
Views for the Clinic Appointment System.
Uses DRF ModelViewSet to provide full CRUD operations:
    - CREATE (POST)   : Create a new record
    - READ   (GET)    : List all records / Retrieve single record
    - UPDATE (PUT)    : Update an existing record (Bonus)
    - DELETE (DELETE)  : Delete a record
"""

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Doctor, Patient, Appointment
from .serializers import DoctorSerializer, PatientSerializer, AppointmentSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Doctor CRUD operations.

    Endpoints:
        GET    /api/doctors/         -> list()     - List all doctors
        POST   /api/doctors/         -> create()   - Create a new doctor
        GET    /api/doctors/{id}/    -> retrieve()  - Get a single doctor
        PUT    /api/doctors/{id}/    -> update()    - Update a doctor (Bonus)
        DELETE /api/doctors/{id}/    -> destroy()   - Delete a doctor
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def create(self, request, *args, **kwargs):
        """CREATE: Add a new doctor."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Doctor created successfully", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):
        """DELETE: Remove a doctor."""
        instance = self.get_object()
        doctor_name = instance.name
        self.perform_destroy(instance)
        return Response(
            {"message": f"Dr. {doctor_name} deleted successfully"},
            status=status.HTTP_200_OK
        )


class PatientViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Patient CRUD operations.

    Endpoints:
        GET    /api/patients/         -> list()     - List all patients
        POST   /api/patients/         -> create()   - Create a new patient
        GET    /api/patients/{id}/    -> retrieve()  - Get a single patient
        PUT    /api/patients/{id}/    -> update()    - Update a patient (Bonus)
        DELETE /api/patients/{id}/    -> destroy()   - Delete a patient
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        """CREATE: Add a new patient."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Patient created successfully", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):
        """DELETE: Remove a patient."""
        instance = self.get_object()
        patient_name = instance.name
        self.perform_destroy(instance)
        return Response(
            {"message": f"Patient {patient_name} deleted successfully"},
            status=status.HTTP_200_OK
        )


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Appointment CRUD operations.

    Endpoints:
        GET    /api/appointments/         -> list()     - List all appointments
        POST   /api/appointments/         -> create()   - Book a new appointment
        GET    /api/appointments/{id}/    -> retrieve()  - Get appointment details
        PUT    /api/appointments/{id}/    -> update()    - Update appointment (Bonus)
        DELETE /api/appointments/{id}/    -> destroy()   - Cancel/delete appointment
    """
    queryset = Appointment.objects.select_related('doctor', 'patient').all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        """CREATE: Book a new appointment."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Appointment booked successfully", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):
        """DELETE: Cancel/remove an appointment."""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Appointment deleted successfully"},
            status=status.HTTP_200_OK
        )
