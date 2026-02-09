"""
Admin configuration for the Clinic Appointment System.
"""

from django.contrib import admin
from .models import Doctor, Patient, Appointment


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialization', 'phone', 'email')
    search_fields = ('name', 'email')
    list_filter = ('specialization',)


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'gender', 'phone', 'email')
    search_fields = ('name', 'email')
    list_filter = ('gender',)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'date', 'time', 'status')
    search_fields = ('patient__name', 'doctor__name')
    list_filter = ('status', 'date')
    raw_id_fields = ('doctor', 'patient')
