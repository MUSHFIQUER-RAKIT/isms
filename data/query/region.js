import { query } from "@/libs/db";

export async function getAllRegion() {
  try {
    const result = await query("SELECT * FROM region ORDER BY created_at DESC");

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw new Error("Database error while fetching user.");
  }
}
