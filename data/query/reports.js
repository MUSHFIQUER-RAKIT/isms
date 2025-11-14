export async function getAllOutreach(
  table = "outreach",
  filter = {},
  limit = 50
) {
  try {
    let whereClauses = [];
    let values = [];
    let index = 1;

    if (filter.report_type) {
      whereClauses.push(`report_type = $${index++}`);
      values.push(filter.report_type);
    }

    if (filter.customer_name) {
      whereClauses.push(`customer_name ILIKE $${index++}`);
      values.push(`%${filter.customer_name}%`);
    }

    if (filter.created_by) {
      whereClauses.push(`created_by = $${index++}`);
      values.push(filter.created_by);
    }

    const orderBy =
      filter.sort === "oldest"
        ? "ORDER BY created_at ASC"
        : "ORDER BY created_at DESC";

    const whereSQL =
      whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    const sql = `
      SELECT * FROM ${table}
      ${whereSQL}
      ${orderBy}
      LIMIT ${limit}
    `;

    const result = await query(sql, values);

    return result.rows || [];
  } catch (err) {
    console.error("Error fetching outreach:", err);
    throw new Error("Database error while fetching outreach.");
  }
}
