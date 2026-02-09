"""
Serializers for the Clinic Appointment System.
Uses Django REST Framework (DRF) ModelSerializer for automatic
serialization/deserialization of model instances.
"""

from rest_framework import serializers
from .models import Doctor, Patient, Appointment


class DoctorSerializer(serializers.ModelSerializer):
    """
    Serializer for Doctor model.
    Handles Create, Read, Update operations.
    """
    specialization_display = serializers.CharField(
        source='get_specialization_display', read_only=True
    )

    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'specialization', 'specialization_display',
            'phone', 'email', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientSerializer(serializers.ModelSerializer):
    """
    Serializer for Patient model.
    Handles Create, Read, Update operations.
    """
    gender_display = serializers.CharField(
        source='get_gender_display', read_only=True
    )

    class Meta:
        model = Patient
        fields = [
            'id', 'name', 'age', 'gender', 'gender_display',
            'phone', 'email', 'address', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Appointment model.
    Includes nested doctor and patient names for display.
    Handles Create, Read, Update operations.
    """
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    status_display = serializers.CharField(
        source='get_status_display', read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            'id', 'doctor', 'doctor_name', 'patient', 'patient_name',
            'date', 'time', 'status', 'status_display',
            'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        """
        Validate that the appointment doesn't conflict with existing ones.
        """
        doctor = data.get('doctor')
        date = data.get('date')
        time = data.get('time')

        if doctor and date and time:
            # Check for conflicts (exclude current instance on update)
            queryset = Appointment.objects.filter(
                doctor=doctor, date=date, time=time
            )
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)
            if queryset.exists():
                raise serializers.ValidationError(
                    "This doctor already has an appointment at this date and time."
                )

        return data
