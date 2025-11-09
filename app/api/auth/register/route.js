export const runtime = "nodejs";

import pool from "@/libs/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role, designation, phone } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required." },
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

    const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }

    if (role === "OWNER") {
      const existingOwner = await pool.query(
        "SELECT id FROM users WHERE role=$1",
        ["OWNER"]
      );
      if (existingOwner.rows.length > 0) {
        return NextResponse.json(
          { message: "OWNER already exists." },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertRes = await pool.query(
      `INSERT INTO users (name, email, password, role,designation, phone, created_at, updated_at)
       VALUES ($1, $2, $3,$4,$5,$6, NOW(), NOW())
       RETURNING id, name, email, role, designation, phone, created_at`,
      [name, email, hashedPassword, role, designation, phone]
    );

    const newUser = insertRes.rows[0];

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
