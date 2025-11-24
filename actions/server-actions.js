"use server";

import { query } from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
  try {
    const res = await query("SELECT * FROM site_settings LIMIT 1");
    return (
      res.rows[0] || {
        site_name: "Progress Tracker",
        site_number: "8801793092241",
        site_title: "World-Class Hosting",
      }
    );
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return [];
  }
}

export async function updateSiteSettings(formData) {
  const { site_name, site_number, site_title } = Object.fromEntries(formData);

  const existing = await query("SELECT id FROM site_settings LIMIT 1");

  if (existing.rows.length) {
    await query(
      "UPDATE site_settings SET site_name=$1, site_number=$2, site_title=$3, updated_at=NOW() WHERE id=$4",
      [site_name, site_number, site_title, existing.rows[0].id]
    );
  } else {
    await query(
      "INSERT INTO site_settings (site_name, site_number, site_title, updated_at) VALUES ($1, $2, $3, NOW())",
      [site_name, site_number, site_title]
    );
  }

  revalidatePath("/");
  revalidatePath("/dashboard/settings");
}

export async function addActivity({ name, action, target }) {
  try {
    if (!name || !action || !target) throw new Error("Missing required fields");

    await query(
      "INSERT INTO activity (name, action, target, created_at) VALUES ($1, $2, $3, NOW())",
      [name, action, target]
    );
  } catch (error) {
    console.error("Error adding activity:", error);
  }
}

export async function getRecentActivities(limit = 10) {
  try {
    const res = await query(
      "SELECT * FROM activity ORDER BY created_at DESC LIMIT $1",
      [limit]
    );
    return res.rows;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}
