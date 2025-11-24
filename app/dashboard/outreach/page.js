import Pagination from "@/components/common/Pagination";
import MakeOutreach from "@/components/dashboard/outreach/MakeOutreach";
import OutreachTable from "@/components/dashboard/outreach/OutreachTable";
import { getAllCustomer } from "@/data/query/customer";
import { getAllReports } from "@/data/query/reports";

export default async function OutreachPage({ searchParams }) {
  const customers = await getAllCustomer();

  const params = await searchParams;

  const { data, pagination } = await getAllReports(
    { ...params, report: "outreach" },
    10,
    Number(params.page) || 1
  );
  return (
    <div className="p-6 flex flex-col gap-8 text-[var(--color-foreground)]">
      <h2 className="text-2xl font-bold text-[var(--color-accent)] flex items-center gap-2">
        Outreach Records
      </h2>

      <MakeOutreach customers={customers} />

      <OutreachTable outreachs={data} />

      <Pagination pagination={pagination} />
    </div>
  );
}
