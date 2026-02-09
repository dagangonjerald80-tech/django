"""
Models for the Clinic Appointment System.

ERD (Entity Relationship Diagram):
    Doctor (1) ----< (M) Appointment (M) >---- (1) Patient

    - Each Doctor can have many Appointments
    - Each Patient can have many Appointments
    - Each Appointment belongs to exactly one Doctor and one Patient
"""

from django.db import models


class Doctor(models.Model):
    """
    Represents a doctor in the clinic.
    """
    SPECIALIZATION_CHOICES = [
        ('general', 'General Practice'),
        ('cardiology', 'Cardiology'),
        ('dermatology', 'Dermatology'),
        ('neurology', 'Neurology'),
        ('orthopedics', 'Orthopedics'),
        ('pediatrics', 'Pediatrics'),
        ('psychiatry', 'Psychiatry'),
        ('surgery', 'Surgery'),
    ]

    name = models.CharField(max_length=200)
    specialization = models.CharField(max_length=50, choices=SPECIALIZATION_CHOICES)
    phone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"Dr. {self.name} ({self.get_specialization_display()})"


class Patient(models.Model):
    """
    Represents a patient in the clinic.
    """
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    name = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} (Age: {self.age})"


class Appointment(models.Model):
    """
    Represents an appointment between a doctor and a patient.
    Each appointment is with exactly one doctor and one patient.
    """
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='scheduled'
    )
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-time']
        # Prevent double-booking: same doctor, same date, same time
        unique_together = ['doctor', 'date', 'time']

    def __str__(self):
        return f"Appointment: {self.patient.name} with Dr. {self.doctor.name} on {self.date} at {self.time}"
