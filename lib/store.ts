/**
 * In-memory data store that mimics the Django database.
 * This simulates the same models defined in Django:
 *   - Doctor
 *   - Patient
 *   - Appointment (FK -> Doctor, FK -> Patient)
 *
 * In production, this would be replaced by the actual
 * Django REST Framework backend with a real database.
 */

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  doctor: number;
  patient: number;
  doctor_name?: string;
  patient_name?: string;
  doctor_specialization?: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface Store {
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  nextDoctorId: number;
  nextPatientId: number;
  nextAppointmentId: number;
}

const SPECIALIZATIONS: Record<string, string> = {
  general: "General Practice",
  cardiology: "Cardiology",
  dermatology: "Dermatology",
  neurology: "Neurology",
  orthopedics: "Orthopedics",
  pediatrics: "Pediatrics",
  psychiatry: "Psychiatry",
  surgery: "Surgery",
};

// Seed data
const store: Store = {
  doctors: [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "cardiology",
      phone: "(555) 101-2001",
      email: "sarah.johnson@clinic.com",
      created_at: "2025-01-15T08:00:00Z",
      updated_at: "2025-01-15T08:00:00Z",
    },
    {
      id: 2,
      name: "Michael Chen",
      specialization: "neurology",
      phone: "(555) 101-2002",
      email: "michael.chen@clinic.com",
      created_at: "2025-01-16T08:00:00Z",
      updated_at: "2025-01-16T08:00:00Z",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialization: "pediatrics",
      phone: "(555) 101-2003",
      email: "emily.rodriguez@clinic.com",
      created_at: "2025-01-17T08:00:00Z",
      updated_at: "2025-01-17T08:00:00Z",
    },
    {
      id: 4,
      name: "David Kim",
      specialization: "orthopedics",
      phone: "(555) 101-2004",
      email: "david.kim@clinic.com",
      created_at: "2025-02-01T08:00:00Z",
      updated_at: "2025-02-01T08:00:00Z",
    },
  ],
  patients: [
    {
      id: 1,
      name: "Alice Thompson",
      age: 34,
      gender: "F",
      phone: "(555) 201-3001",
      email: "alice.t@email.com",
      address: "123 Main St, Springfield",
      created_at: "2025-02-01T09:00:00Z",
      updated_at: "2025-02-01T09:00:00Z",
    },
    {
      id: 2,
      name: "Bob Martinez",
      age: 45,
      gender: "M",
      phone: "(555) 201-3002",
      email: "bob.m@email.com",
      address: "456 Oak Ave, Riverside",
      created_at: "2025-02-02T09:00:00Z",
      updated_at: "2025-02-02T09:00:00Z",
    },
    {
      id: 3,
      name: "Carol Davis",
      age: 8,
      gender: "F",
      phone: "(555) 201-3003",
      email: "carol.d@email.com",
      address: "789 Pine Rd, Lakewood",
      created_at: "2025-02-03T09:00:00Z",
      updated_at: "2025-02-03T09:00:00Z",
    },
  ],
  appointments: [
    {
      id: 1,
      doctor: 1,
      patient: 1,
      date: "2026-02-15",
      time: "09:00",
      status: "scheduled",
      notes: "Regular cardiology checkup",
      created_at: "2025-02-10T10:00:00Z",
      updated_at: "2025-02-10T10:00:00Z",
    },
    {
      id: 2,
      doctor: 2,
      patient: 2,
      date: "2026-02-16",
      time: "14:30",
      status: "scheduled",
      notes: "Follow-up consultation",
      created_at: "2025-02-10T11:00:00Z",
      updated_at: "2025-02-10T11:00:00Z",
    },
    {
      id: 3,
      doctor: 3,
      patient: 3,
      date: "2026-02-14",
      time: "10:00",
      status: "completed",
      notes: "Pediatric wellness visit",
      created_at: "2025-02-08T09:00:00Z",
      updated_at: "2025-02-14T10:30:00Z",
    },
  ],
  nextDoctorId: 5,
  nextPatientId: 4,
  nextAppointmentId: 4,
};

export function getStore(): Store {
  return store;
}

export { SPECIALIZATIONS };
