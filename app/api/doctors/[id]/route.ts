import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

// GET /api/doctors/:id - Retrieve a doctor (READ)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const doctor = store.doctors.find((d) => d.id === parseInt(id));
  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }
  return NextResponse.json(doctor);
}

// PUT /api/doctors/:id - Update a doctor (UPDATE)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const index = store.doctors.findIndex((d) => d.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  const body = await request.json();
  store.doctors[index] = {
    ...store.doctors[index],
    ...body,
    id: store.doctors[index].id,
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json({
    message: "Doctor updated successfully",
    data: store.doctors[index],
  });
}

// DELETE /api/doctors/:id - Delete a doctor (DELETE)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const index = store.doctors.findIndex((d) => d.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  const doctor = store.doctors[index];
  store.doctors.splice(index, 1);
  // Also remove related appointments
  store.appointments = store.appointments.filter(
    (a) => a.doctor !== parseInt(id)
  );

  return NextResponse.json({
    message: `Dr. ${doctor.name} deleted successfully`,
  });
}
