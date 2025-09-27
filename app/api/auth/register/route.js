import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password, employeeId, designation, phone, role } =
      await req.json();

    if (!name) {
      return new NextResponse("Name is Mandatory", { status: 400 });
    }
    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }
    if (!password) {
      return new NextResponse("password required", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const Employee = await db.Employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        employeeId,
        designation,
        phone,
        role,
      },
    });
    return NextResponse.json(Employee, { status: 201 });
  } catch (error) {
    console.error("POST Employee ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
