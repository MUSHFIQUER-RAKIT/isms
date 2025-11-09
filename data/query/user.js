import { query } from "@/libs/db";

export async function getUser(filters = {}) {
  try {
    let baseQuery = `
      SELECT id, name, email, role, designation, phone, created_at, updated_at
      FROM users
    `;

    const conditions = [];
    const values = [];

    // Build dynamic WHERE clause
    if (filters.name) {
      values.push(`%${filters.name}%`);
      conditions.push(`name ILIKE $${values.length}`);
    }
    if (filters.email) {
      values.push(`%${filters.email}%`);
      conditions.push(`email ILIKE $${values.length}`);
    }
    if (filters.role) {
      values.push(filters.role);
      conditions.push(`role = $${values.length}`);
    }
    if (filters.designation) {
      values.push(`%${filters.designation}%`);
      conditions.push(`designation ILIKE $${values.length}`);
    }

    // Append WHERE if filters exist
    if (conditions.length > 0) {
      baseQuery += ` WHERE ${conditions.join(" AND ")}`;
    }

    baseQuery += ` ORDER BY created_at DESC`;

    const result = await query(baseQuery, values);

    // Return all or empty array if no match
    return result.rows || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Database error while fetching users.");
  }
}

export async function getUserById(id) {
  try {
    const result = await query(
      "SELECT id, name, email, role, designation, phone, created_at, updated_at FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw new Error("Database error while fetching user.");
  }
}
