import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

// GET /api/appointments - List all appointments (READ)
export async function GET() {
  const store = getStore();
  const appointmentsWithNames = store.appointments.map((appt) => {
    const doctor = store.doctors.find((d) => d.id === appt.doctor);
    const patient = store.patients.find((p) => p.id === appt.patient);
    return {
      ...appt,
      doctor_name: doctor?.name || "Unknown",
      patient_name: patient?.name || "Unknown",
      doctor_specialization: doctor?.specialization || "",
    };
  });
  return NextResponse.json(appointmentsWithNames);
}

// POST /api/appointments - Create a new appointment (CREATE)
export async function POST(request: Request) {
  const store = getStore();
  const body = await request.json();

  // Validate doctor exists
  const doctor = store.doctors.find((d) => d.id === parseInt(body.doctor));
  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 400 });
  }

  // Validate patient exists
  const patient = store.patients.find((p) => p.id === parseInt(body.patient));
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 400 });
  }

  // Check for scheduling conflicts
  const conflict = store.appointments.find(
    (a) =>
      a.doctor === parseInt(body.doctor) &&
      a.date === body.date &&
      a.time === body.time
  );
  if (conflict) {
    return NextResponse.json(
      {
        error:
          "This doctor already has an appointment at this date and time.",
      },
      { status: 400 }
    );
  }

  const newAppointment = {
    id: store.nextAppointmentId++,
    doctor: parseInt(body.doctor),
    patient: parseInt(body.patient),
    date: body.date,
    time: body.time,
    status: body.status || "scheduled",
    notes: body.notes || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.appointments.push(newAppointment);

  return NextResponse.json(
    {
      message: "Appointment booked successfully",
      data: {
        ...newAppointment,
        doctor_name: doctor.name,
        patient_name: patient.name,
      },
    },
    { status: 201 }
  );
}
