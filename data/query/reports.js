import { query } from "@/libs/db";

export async function getAllReports(filter = {}, limit = 50) {
  try {
    let whereClauses = [];
    let values = [];
    let index = 1;
    let table = null;
    let customerIdColumn = null;
    let createdByColumn = "created_by";

    const reportType = filter.report || "region";

    switch (reportType) {
      case "region":
        table = "region";
        // For simple tables like 'region' and 'institute', only 'created_by' filtering applies
        break;
      case "institute":
        table = "institute";
        break;
      case "customer":
        table = "customer";
        // 'customer' table uses 'id' for the customer reference
        customerIdColumn = "id";
        break;
      case "outreach":
        table = "outreach";
        // 'outreach' table uses 'customer_id' for the customer reference
        customerIdColumn = "customer_id";
        break;
      default:
        // Handle case where report type is missing or unknown
        throw new Error("Invalid or missing report type.");
    }

    // --- 2. Filtering Logic (Dynamic) ---

    // Handle 'customer' filter (Only relevant for customer and outreach tables)
    if (filter.customer && customerIdColumn) {
      whereClauses.push(`${customerIdColumn} = $${index++}`);
      values.push(filter.customer);
    }

    // Handle 'created by' filter (Relevant for all tables)
    const createdByValue = filter["created by"] || filter.created_by;
    if (createdByValue) {
      // Assuming 'created_by' is a text field storing the creator's identifier
      whereClauses.push(`${createdByColumn} = $${index++}`);
      values.push(createdByValue);
    }


    let orderBy = "ORDER BY created_at DESC"; // Default to Newest (sort=1)

    const sortOption = filter.sort; // The URL provides '3' for "This Month"

    // Add date range filtering based on sort option 2, 3, or 4
    if (sortOption === "2") {
      // This Week
      whereClauses.push(`created_at >= NOW() - INTERVAL '7 days'`);
    } else if (sortOption === "3") {
      // This Month
      whereClauses.push(`created_at >= DATE_TRUNC('month', CURRENT_DATE)`);
    } else if (sortOption === "4") {
      // This Year
      whereClauses.push(`created_at >= DATE_TRUNC('year', CURRENT_DATE)`);
    } else if (sortOption === "5") {
      // Oldest
      orderBy = "ORDER BY created_at ASC";
    }

    const whereSQL =
      whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    const sql = `
      SELECT * FROM ${table}
      ${whereSQL}
      ${orderBy}
      LIMIT $${index++}
    `;
    values.push(limit);

    const result = await query(sql, values);

    return result.rows || [];
  } catch (err) {
    console.error(`Error fetching reports for type:`, err);
  }
}
