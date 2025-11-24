import { query } from "@/libs/db";

export async function getAllReports(filter = {}, limit = 5000000000, page = 1) {
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
          "id, name, email, role, designation, phone, created_at, updated_at";
        break;
      case "outreach":
        table = "outreach";
        customerIdColumn = "customer_id";
        break;
      default:
        throw new Error("Invalid or missing report type.");
    }

    // 🔍 FILTERING LOGIC

    if (filter.customer && customerIdColumn) {
      whereClauses.push(`${customerIdColumn} = $${index++}`);
      values.push(filter.customer);
    }

    if (filter.created) {
      whereClauses.push(`${createdByColumn} = $${index++}`);
      values.push(filter.created);
    }

    let orderBy = "ORDER BY created_at ASC";

    const sortOption = filter.sort;

    if (sortOption === "2") {
      whereClauses.push(`created_at >= NOW() - INTERVAL '7 days'`);
    } else if (sortOption === "3") {
      whereClauses.push(`created_at >= DATE_TRUNC('month', CURRENT_DATE)`);
    } else if (sortOption === "4") {
      whereClauses.push(`created_at >= DATE_TRUNC('year', CURRENT_DATE)`);
    } else if (sortOption === "5") {
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
    }

    const whereSQL =
      whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    //  PAGINATION
    const offset = (page - 1) * limit;

    // Count query for pagination
    const countSql = `
      SELECT COUNT(*) AS total
      FROM ${table}
      ${whereSQL}
    `;
    const countResult = await query(countSql, values);
    const totalItems = parseInt(countResult.rows[0].total, 10);
    const totalPages = Math.ceil(totalItems / limit);

    // MAIN DATA QUERY
    const sql = `
      SELECT ${selectColumns} FROM ${table}
      ${whereSQL}
      ${orderBy}
      LIMIT $${index}
      OFFSET $${index + 1}
    `;

    const finalValues = [...values, limit, offset];

    const result = await query(sql, finalValues);

    return {
      data: result.rows || [],
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (err) {
    console.error(`Error fetching reports for type:`, err);
    return { data: [], pagination: {} };
  }
}
