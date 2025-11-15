import { getAllReports } from "@/data/query/reports";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(request) {
  try {
    // 1. Get search parameters (filters) from the URL
    const { searchParams } = new URL(request.url);
    const filter = Object.fromEntries(searchParams.entries());

    // Set a default report type if none is provided (to match your reports page logic)
    const reportType = filter.report || "outreach";

    // 2. Fetch the data using your existing function
    const reports = await getAllReports(
      { ...filter, report: reportType },
      5000
    ); // Increased limit for export

    if (!reports || reports.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message: `No data found for report type: ${reportType}`,
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Convert the JSON array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(reports);

    // 4. Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      reportType.toUpperCase() + "_DATA"
    );

    // 5. Generate the Excel file buffer (binary data)
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // 6. Return the file as a downloadable response
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${reportType}_report_${new Date()
          .toISOString()
          .slice(0, 10)}.xlsx"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Length": excelBuffer.length,
      },
    });
  } catch (error) {
    console.error("Error during Excel export:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error generating Excel file.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
