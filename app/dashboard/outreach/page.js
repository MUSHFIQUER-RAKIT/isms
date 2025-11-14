import MakeOutreach from "@/components/dashboard/outreach/MakeOutreach";
import OutreachTable from "@/components/dashboard/outreach/OutreachTable";
import { getAllCustomer } from "@/data/query/customer";
import { getAllOutreach } from "@/data/query/outreach";

export default async function OutreachPage() {
  const customers = await getAllCustomer();
  const outreachs = await getAllOutreach();

  return (
    <div className="p-6 flex flex-col gap-8 text-[var(--color-foreground)]">
      <h2 className="text-2xl font-bold text-[var(--color-accent)] flex items-center gap-2">
        Outreach Records
      </h2>

      <MakeOutreach customers={customers} />

      <OutreachTable outreachs={outreachs} />
    </div>
  );
}
