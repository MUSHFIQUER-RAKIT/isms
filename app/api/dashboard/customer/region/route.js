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
      "SELECT * FROM region ORDER BY created_at DESC"
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
    const { region } = await req.json();

    if (!region) {
      return NextResponse.json(
        { error: "Region is required" },
        { status: 400 }
      );
    }

    const exists = await pool.query("SELECT * FROM region WHERE region = $1", [
      region,
    ]);
    if (exists.rows.length > 0) {
      return NextResponse.json(
        { error: "Region already exists" },
        { status: 400 }
      );
    }

    const insert = await pool.query(
      "INSERT INTO region (region, created_by, created_by_id) VALUES ($1, $2 ,$3) RETURNING *",
      [region, session.user.name, session.user.id]
    );

    await addActivity({
      name: session.user.name,
      action: "Added",
      target: `Region: ${region}`,
    });
    return NextResponse.json({
      message: "Region added successfully",
      data: insert.rows[0],
    });
  } catch (error) {
    console.error("Error creating region:", error);
    return NextResponse.json(
      { error: "Failed to create region" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, region } = await req.json();
    if (!region) {
      return NextResponse.json(
        { error: "Region name is required" },
        { status: 400 }
      );
    }

    const updated = await pool.query(
      "UPDATE region SET region = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [region, id]
    );

    if (updated.rowCount === 0) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }

    await addActivity({
      name: session.user.name,
      action: "Updated",
      target: `Region to: ${region}`,
    });

    return NextResponse.json({
      message: "Region updated successfully",
      data: updated.rows[0],
    });
  } catch (error) {
    console.error("Error updating region:", error);
    return NextResponse.json(
      { error: "Failed to update region" },
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
      "DELETE FROM region WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleted.rowCount === 0) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }

    await addActivity({
      name: session.user.name,
      action: "Deleted",
      target: "Region",
    });
    return NextResponse.json({ message: "Region deleted successfully" });
  } catch (error) {
    console.error("Error deleting region:", error);
    return NextResponse.json(
      { error: "Failed to delete region" },
      { status: 500 }
    );
  }
}
