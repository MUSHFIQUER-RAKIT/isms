import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Error parsing request body as JSON:", error);
    return NextResponse.json(
      { message: "Invalid JSON format in request body." },
      { status: 400 }
    );
  }

  const { name, email, password, employeeId, designation, phone, role } = body;

  try {
    if (!name) {
      return NextResponse.json(
        { message: "Name is mandatory." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password is required." },
        { status: 400 }
      );
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
    console.error("Employee creation error:", error);

    if (error.code === "P2002") {
      const target = error.meta?.target || "a unique field";
      return NextResponse.json(
        {
          message: `An employee with this ${target.join(", ")} already exists.`,
        },
        { status: 409 } 
      );
    }
    return NextResponse.json(
      { message: "Internal server error during employee creation." },
      { status: 500 }
    );
  }
}
