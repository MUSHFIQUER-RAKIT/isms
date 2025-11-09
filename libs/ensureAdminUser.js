export const runtime = "nodejs";

import { query } from "@/libs/db";
import bcrypt from "bcryptjs";

export async function ensureAdminUser() {
  const email = "admin@admin.com";
  const existing = await query("SELECT * FROM users WHERE email = $1", [email]);
  if (existing.rowCount === 0) {
    const hashed = await bcrypt.hash("admin", 10);
    await query(
      "INSERT INTO users (name, email, password, role, designation) VALUES ($1, $2, $3,$4,$5)",
      ["Admin", email, hashed, "OWNER", "OWNER"]
    );
  }
}
