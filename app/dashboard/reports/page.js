import ReportsFilters from "@/components/dashboard/reports/ReportsFilters";
import ReportTable from "@/components/dashboard/reports/ReportTable";
import { getAllCustomer } from "@/data/query/customer";
import { getAllReports } from "@/data/query/reports";
import { getUser } from "@/data/query/user";

export default async function ReportsPage({ searchParams }) {
  const users = await getUser();
  const customers = await getAllCustomer();

  const createdBy = users.map((u) => ({ id: u.id, name: u.name }));
  const customer = customers.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
  }));

  const params = await searchParams;
  const reportType = params.report || "region";
  const reports = await getAllReports({ ...params, report: reportType });

  return (
    <div className="lg:p-6 flex flex-col gap-6">
      <ReportsFilters
        customer={customer}
        createdBy={createdBy}
        some={reports.length > 0}
      >
        <ReportTable reports={reports} reportType={reportType} />
      </ReportsFilters>
    </div>
  );
}
