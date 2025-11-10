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
      "SELECT * FROM institute ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching institute:", error);
    return NextResponse.json(
      { error: "Failed to fetch institute" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { institute } = await req.json();

    if (!institute) {
      return NextResponse.json(
        { error: "institute is required" },
        { status: 400 }
      );
    }

    const exists = await pool.query(
      "SELECT * FROM institute WHERE institute = $1",
      [institute]
    );
    if (exists.rows.length > 0) {
      return NextResponse.json(
        { error: "institute already exists" },
        { status: 400 }
      );
    }

    const insert = await pool.query(
      "INSERT INTO institute (institute, created_by) VALUES ($1, $2) RETURNING *",
      [institute, session.user.name]
    );

    await addActivity({
      name: session.user.name,
      action: "Added",
      target: `institute: ${institute}`,
    });
    return NextResponse.json({
      message: "institute added successfully",
      data: insert.rows[0],
    });
  } catch (error) {
    console.error("Error creating institute:", error);
    return NextResponse.json(
      { error: "Failed to create institute" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, institute } = await req.json();
    if (!institute) {
      return NextResponse.json(
        { error: "institute name is required" },
        { status: 400 }
      );
    }

    const updated = await pool.query(
      "UPDATE institute SET institute = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [institute, id]
    );

    if (updated.rowCount === 0) {
      return NextResponse.json(
        { error: "institute not found" },
        { status: 404 }
      );
    }

    await addActivity({
      name: session.user.name,
      action: "Updated",
      target: `institute to: ${institute}`,
    });

    return NextResponse.json({
      message: "institute updated successfully",
      data: updated.rows[0],
    });
  } catch (error) {
    console.error("Error updating institute:", error);
    return NextResponse.json(
      { error: "Failed to update institute" },
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
      "DELETE FROM institute WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleted.rowCount === 0) {
      return NextResponse.json(
        { error: "institute not found" },
        { status: 404 }
      );
    }

    await addActivity({
      name: session.user.name,
      action: "Deleted",
      target: "institute",
    });
    return NextResponse.json({ message: "institute deleted successfully" });
  } catch (error) {
    console.error("Error deleting institute:", error);
    return NextResponse.json(
      { error: "Failed to delete institute" },
      { status: 500 }
    );
  }
}
