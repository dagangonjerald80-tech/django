import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

// GET /api/patients - List all patients (READ)
export async function GET() {
  const store = getStore();
  return NextResponse.json(store.patients);
}

// POST /api/patients - Create a new patient (CREATE)
export async function POST(request: Request) {
  const store = getStore();
  const body = await request.json();

  const newPatient = {
    id: store.nextPatientId++,
    name: body.name,
    age: body.age,
    gender: body.gender,
    phone: body.phone,
    email: body.email,
    address: body.address || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.patients.push(newPatient);
  return NextResponse.json(
    { message: "Patient created successfully", data: newPatient },
    { status: 201 }
  );
}
