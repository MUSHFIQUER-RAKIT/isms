import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalEmployeeCount = await db.Employee.count();

    const employee = await db.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        designation: true,
        role: true,
        phone: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(
      {
        totalEmployeeCount,
        employee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return NextResponse.json(
      { message: "Failed to fetch employee data." },
      { status: 500 }
    );
  }
}
