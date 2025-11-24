import { getAllReports } from "@/data/query/reports";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(request) {
  try {
    // 1. Read URL params
    const { searchParams } = new URL(request.url);
    const filter = Object.fromEntries(searchParams.entries());

    // If no report is given, default to outreach
    const reportType = filter.report || "region";

    // Remove pagination (we want full dataset)
    delete filter.page;
    delete filter.limit;

    // 2. Fetch ALL rows for export
    const { data } = await getAllReports(
      { ...filter, report: reportType },
      5000, // large limit to export everything
      1
    );

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: `No data found for report type: ${reportType}` },
        { status: 404 }
      );
    }

    // 3. Convert JSON → Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 4. Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      reportType.toUpperCase() + "_DATA"
    );

    // 5. Convert workbook → Buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // 6. Send Excel file
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${reportType}_report_${new Date()
          .toISOString()
          .slice(0, 10)}.xlsx"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      {
        message: "Error generating Excel file.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
