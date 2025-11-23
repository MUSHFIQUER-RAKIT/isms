import { query } from "@/libs/db";

export async function getAllReports(filter = {}, limit = 1000) {
  try {
    let whereClauses = [];
    let values = [];
    let index = 1;
    let table = null;
    let customerIdColumn = null;
    let createdByColumn = "created_by_id";
    let selectColumns = "*";

    const reportType = filter.report || "region";

    switch (reportType) {
      case "region":
        table = "region";
        break;
      case "institute":
        table = "institute";
        break;
      case "customer":
        table = "customer";
        customerIdColumn = "id";
        break;
      case "account":
        table = "users";
        createdByColumn = "role";
        selectColumns =
          "id, name, email, role,designation,phone, created_at, updated_at";
        break;
      case "outreach":
        table = "outreach";
        customerIdColumn = "customer_id";
        break;
      default:
        throw new Error("Invalid or missing report type.");
    }

    if (filter.customer && customerIdColumn) {
      whereClauses.push(`${customerIdColumn} = $${index++}`);
      values.push(filter.customer);
    }

    if (filter.created) {
      whereClauses.push(`${createdByColumn} = $${index++}`);
      values.push(filter.created);
    }

    let orderBy = "ORDER BY created_at DESC";

    const sortOption = filter.sort;

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

    const filterOption = filter.filter;

    if (filterOption === "1") {
      whereClauses.push(`call_status = 'successed'`);
    } else if (filterOption === "2") {
      whereClauses.push(`call_status = 'declined'`);
    } else if (filterOption === "3") {
      whereClauses.push(`service_status = 'accepted'`);
    } else if (filterOption === "4") {
      whereClauses.push(`service_status = 'follow_up'`);
    } else if (filterOption === "5") {
      whereClauses.push(`service_status = 'cancled'`);
    } else {
      orderBy = "ORDER BY created_at ASC";
    }

    const whereSQL =
      whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    const sql = `
      SELECT ${selectColumns} FROM ${table}
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
