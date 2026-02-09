import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

// GET /api/doctors - List all doctors (READ)
export async function GET() {
  const store = getStore();
  return NextResponse.json(store.doctors);
}

// POST /api/doctors - Create a new doctor (CREATE)
export async function POST(request: Request) {
  const store = getStore();
  const body = await request.json();

  const newDoctor = {
    id: store.nextDoctorId++,
    name: body.name,
    specialization: body.specialization,
    phone: body.phone,
    email: body.email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.doctors.push(newDoctor);
  return NextResponse.json(
    { message: "Doctor created successfully", data: newDoctor },
    { status: 201 }
  );
}
