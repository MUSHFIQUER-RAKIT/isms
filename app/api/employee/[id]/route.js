import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const employeeId = params.id;

  if (!employeeId) {
    return NextResponse.json(
      { message: "Employee ID is required for deletion." },
      { status: 400 }
    );
  }

  try {
    const deletedEmployee = await db.Employee.delete({
      where: {
        id: Number(employeeId),
      },
    });

    return NextResponse.json(
      {
        message: "Employee successfully deleted.",
        deletedEmployee: deletedEmployee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting employee:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: `Employee with ID ${employeeId} not found.` },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json(
      { message: "Internal server error during deletion." },
      { status: 500 }
    );
  }
}
