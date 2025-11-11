import { addActivity } from "@/actions/server-actions";
import { auth } from "@/auth";
import pool from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await pool.query(
      "SELECT * FROM customer ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, email, phone, address, comment, region, institute } =
      await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Field is required" }, { status: 400 });
    }

    const exists = await pool.query("SELECT * FROM customer WHERE email = $1", [
      email,
    ]);
    if (exists.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const insert = await pool.query(
      "INSERT INTO customer (name, email, phone, address, comment, region, institute, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        email,
        phone,
        address,
        comment,
        region,
        institute,
        session.user.name,
      ]
    );

    await addActivity({
      name: session.user.name,
      action: "Added",
      target: `Customer: ${name}`,
    });
    return NextResponse.json({
      message: "Customer added successfully",
      data: insert.rows[0],
    });
  } catch (error) {
    console.error("Error creating Customer:", error);
    return NextResponse.json(
      { error: "Failed to create Customer" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, name, email, phone, address, comment, region, institute } =
      await req.json();

    if (!id || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const query = `
      UPDATE customer 
      SET 
        name = $1,
        email = $2,
        phone = $3,
        address = $4,
        comment = $5,
        region = $6,
        institute = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING *;
    `;

    const values = [
      name,
      email,
      phone,
      address,
      comment,
      region,
      institute,
      id,
    ];
    const updated = await pool.query(query, values);

    if (updated.rowCount === 0) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    await addActivity({
      name: session.user.name,
      action: "Updated",
      target: `customer: ${name}`,
    });

    return NextResponse.json({
      message: "Customer updated successfully",
      data: updated.rows[0],
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const deleted = await pool.query(
      "DELETE FROM customer WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleted.rowCount === 0) {
      return NextResponse.json(
        { error: "customer not found" },
        { status: 404 }
      );
    }

    await addActivity({
      name: session.user.name,
      action: "Deleted",
      target: "customer",
    });
    return NextResponse.json({ message: "customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
