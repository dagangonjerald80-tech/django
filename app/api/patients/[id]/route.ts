import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

// GET /api/patients/:id - Retrieve a patient (READ)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const patient = store.patients.find((p) => p.id === parseInt(id));
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }
  return NextResponse.json(patient);
}

// PUT /api/patients/:id - Update a patient (UPDATE)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const index = store.patients.findIndex((p) => p.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const body = await request.json();
  store.patients[index] = {
    ...store.patients[index],
    ...body,
    id: store.patients[index].id,
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json({
    message: "Patient updated successfully",
    data: store.patients[index],
  });
}

// DELETE /api/patients/:id - Delete a patient (DELETE)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const store = getStore();
  const index = store.patients.findIndex((p) => p.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const patient = store.patients[index];
  store.patients.splice(index, 1);
  // Also remove related appointments
  store.appointments = store.appointments.filter(
    (a) => a.patient !== parseInt(id)
  );

  return NextResponse.json({
    message: `Patient ${patient.name} deleted successfully`,
  });
}
