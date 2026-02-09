import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

// GET /api/appointments/:id - Retrieve an appointment (READ)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const appt = store.appointments.find((a) => a.id === parseInt(id));
  if (!appt) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }
  const doctor = store.doctors.find((d) => d.id === appt.doctor);
  const patient = store.patients.find((p) => p.id === appt.patient);
  return NextResponse.json({
    ...appt,
    doctor_name: doctor?.name || "Unknown",
    patient_name: patient?.name || "Unknown",
  });
}

// PUT /api/appointments/:id - Update an appointment (UPDATE)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const index = store.appointments.findIndex((a) => a.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }

  const body = await request.json();
  store.appointments[index] = {
    ...store.appointments[index],
    ...body,
    doctor: body.doctor
      ? parseInt(body.doctor)
      : store.appointments[index].doctor,
    patient: body.patient
      ? parseInt(body.patient)
      : store.appointments[index].patient,
    id: store.appointments[index].id,
    updated_at: new Date().toISOString(),
  };

  const appt = store.appointments[index];
  const doctor = store.doctors.find((d) => d.id === appt.doctor);
  const patient = store.patients.find((p) => p.id === appt.patient);

  return NextResponse.json({
    message: "Appointment updated successfully",
    data: {
      ...appt,
      doctor_name: doctor?.name || "Unknown",
      patient_name: patient?.name || "Unknown",
    },
  });
}

// DELETE /api/appointments/:id - Delete an appointment (DELETE)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const index = store.appointments.findIndex((a) => a.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }

  store.appointments.splice(index, 1);
  return NextResponse.json({ message: "Appointment deleted successfully" });
}
