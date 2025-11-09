export const runtime = "nodejs";

import { addActivity } from "@/actions/server-actions";
import { auth } from "@/auth";
import pool from "@/libs/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await pool.query(`
      SELECT id, name, email,role ,designation,phone, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `);

    const users = res.rows.map((u) => ({
      ...u,
      id: String(u.id),
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/dashboard/user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, name, email, role, designation, phone } = await req.json();
    if (!id || !name || !email)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Check duplicate email
    const dupRes = await pool.query(
      "SELECT id FROM users WHERE email=$1 AND id <> $2",
      [email, id]
    );
    if (dupRes.rows.length)
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );

    // Update user
    const updateRes = await pool.query(
      "UPDATE users SET name=$1, email=$2, role=$3, designation=$4,  phone=$5 , updated_at=NOW() WHERE id=$6 RETURNING *",
      [name, email, role, designation, phone, id]
    );
    const updated = updateRes.rows[0];

    await addActivity({
      name: session.user.name,
      action: "Edited",
      target: `User info of ${updated.name}`,
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("PUT /api/dashboard/user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, oldPassword, newPassword } = await req.json();
    if (!id || !oldPassword || !newPassword)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Get user
    const userRes = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    const user = userRes.rows[0];
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Incorrect old password" },
        { status: 401 }
      );

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE users SET password=$1, updated_at=NOW() WHERE id=$2",
      [hashed, id]
    );

    await addActivity({
      name: session.user.name,
      action: "Changed",
      target: `Password of ${user.name}`,
    });

    return NextResponse.json({ success: true, message: "Password changed" });
  } catch (err) {
    console.error("PATCH /api/dashboard/user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
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

    const delRes = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    const deleted = delRes.rows[0];

    await addActivity({
      name: session.user.name,
      action: "Deleted",
      target: `User: ${deleted.name}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/dashboard/user error:", err);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
