import MakeOutreach from "@/components/dashboard/outreach/MakeOutreach";
import OutreachTable from "@/components/dashboard/outreach/OutreachTable";
import { getAllCustomer } from "@/data/query/customer";

export default async function OutreachPage() {
  const customers = await getAllCustomer();

  return (
    <div className="p-6 flex flex-col gap-8 text-[var(--color-foreground)]">
      <h2 className="text-2xl font-bold text-[var(--color-accent)] flex items-center gap-2">
        Outreach Records
      </h2>

      <MakeOutreach customers={customers} />

      <OutreachTable />
    </div>
  );
}
