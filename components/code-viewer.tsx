"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  title: string;
  filename: string;
  language: string;
  code: string;
}

function CodeBlock({ title, filename, language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <Badge variant="secondary" className="font-mono text-xs">
            {language}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <pre className="overflow-x-auto bg-card p-4 text-sm leading-relaxed">
        <code className="text-foreground font-mono">{code}</code>
      </pre>
    </div>
  );
}

export function CodeViewer() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Django REST Framework Code
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete DRF backend code with models, serializers, views, and URL
          routing. Download and run in VS Code.
        </p>
      </div>

      <div className="space-y-4">
        <CodeBlock
          title="Models"
          filename="appointments/models.py"
          language="Python"
          code={`from django.db import models


class Doctor(models.Model):
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
    specialization = models.CharField(
        max_length=50, choices=SPECIALIZATION_CHOICES
    )
    phone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"Dr. {self.name}"


class Patient(models.Model):
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
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]

    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE,
        related_name='appointments'
    )
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE,
        related_name='appointments'
    )
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES,
        default='scheduled'
    )
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-time']
        unique_together = ['doctor', 'date', 'time']

    def __str__(self):
        return (
            f"Appointment: {self.patient.name} "
            f"with Dr. {self.doctor.name} "
            f"on {self.date} at {self.time}"
        )`}
        />

        <CodeBlock
          title="Serializers"
          filename="appointments/serializers.py"
          language="Python"
          code={`from rest_framework import serializers
from .models import Doctor, Patient, Appointment


class DoctorSerializer(serializers.ModelSerializer):
    specialization_display = serializers.CharField(
        source='get_specialization_display', read_only=True
    )

    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'specialization',
            'specialization_display', 'phone', 'email',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientSerializer(serializers.ModelSerializer):
    gender_display = serializers.CharField(
        source='get_gender_display', read_only=True
    )

    class Meta:
        model = Patient
        fields = [
            'id', 'name', 'age', 'gender',
            'gender_display', 'phone', 'email',
            'address', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(
        source='doctor.name', read_only=True
    )
    patient_name = serializers.CharField(
        source='patient.name', read_only=True
    )
    status_display = serializers.CharField(
        source='get_status_display', read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            'id', 'doctor', 'doctor_name',
            'patient', 'patient_name',
            'date', 'time', 'status',
            'status_display', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        doctor = data.get('doctor')
        date = data.get('date')
        time = data.get('time')
        if doctor and date and time:
            qs = Appointment.objects.filter(
                doctor=doctor, date=date, time=time
            )
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError(
                    "Doctor already has an appointment "
                    "at this date and time."
                )
        return data`}
        />

        <CodeBlock
          title="Views (ViewSets)"
          filename="appointments/views.py"
          language="Python"
          code={`from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Doctor, Patient, Appointment
from .serializers import (
    DoctorSerializer,
    PatientSerializer,
    AppointmentSerializer,
)


class DoctorViewSet(viewsets.ModelViewSet):
    """
    CRUD for Doctors:
      GET    /api/doctors/       -> list
      POST   /api/doctors/       -> create
      GET    /api/doctors/{id}/  -> retrieve
      PUT    /api/doctors/{id}/  -> update
      DELETE /api/doctors/{id}/  -> destroy
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Doctor created", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        name = instance.name
        self.perform_destroy(instance)
        return Response(
            {"message": f"Dr. {name} deleted"},
            status=status.HTTP_200_OK,
        )


class PatientViewSet(viewsets.ModelViewSet):
    """
    CRUD for Patients:
      GET    /api/patients/       -> list
      POST   /api/patients/       -> create
      GET    /api/patients/{id}/  -> retrieve
      PUT    /api/patients/{id}/  -> update
      DELETE /api/patients/{id}/  -> destroy
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Patient created", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        name = instance.name
        self.perform_destroy(instance)
        return Response(
            {"message": f"{name} deleted"},
            status=status.HTTP_200_OK,
        )


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    CRUD for Appointments:
      GET    /api/appointments/       -> list
      POST   /api/appointments/       -> create
      GET    /api/appointments/{id}/  -> retrieve
      PUT    /api/appointments/{id}/  -> update
      DELETE /api/appointments/{id}/  -> destroy
    """
    queryset = Appointment.objects.select_related(
        'doctor', 'patient'
    ).all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Appointment booked", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Appointment deleted"},
            status=status.HTTP_200_OK,
        )`}
        />

        <CodeBlock
          title="URL Routing"
          filename="appointments/urls.py"
          language="Python"
          code={`from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'doctors', views.DoctorViewSet)
router.register(r'patients', views.PatientViewSet)
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


# clinic_project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('appointments.urls')),
]`}
        />
      </div>
    </div>
  );
}
