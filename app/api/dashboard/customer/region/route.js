import pool from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
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
  try {
    const { region, created_by } = await req.json();

    if (!region || !created_by) {
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
      "INSERT INTO region (region, created_by) VALUES ($1, $2) RETURNING *",
      [region, created_by]
    );

    return NextResponse.json(insert.rows[0]);
  } catch (error) {
    console.error("Error creating region:", error);
    return NextResponse.json(
      { error: "Failed to create region" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
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

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    console.error("Error updating region:", error);
    return NextResponse.json(
      { error: "Failed to update region" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
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

    return NextResponse.json({ message: "Region deleted successfully" });
  } catch (error) {
    console.error("Error deleting region:", error);
    return NextResponse.json(
      { error: "Failed to delete region" },
      { status: 500 }
    );
  }
}
