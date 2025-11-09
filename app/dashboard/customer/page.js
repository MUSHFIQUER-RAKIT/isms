import AddCustomerForm from "@/components/dashboard/customer/AddCustomerForm";
import AddInstituteTypeForm from "@/components/dashboard/customer/AddInstituteTypeForm";
import AddRegionForm from "@/components/dashboard/customer/AddRegionForm";
import CustomerTable from "@/components/dashboard/customer/CustomerTable";
import { getAllRegion } from "@/data/query/region";

export default async function CustomerPage() {
  const regions = await getAllRegion();

  return (
    <div className="min-h-screen   text-[var(--color-foreground)]">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-accent)]">
        Customer Management
      </h1>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] flex flex-row  rounded-xl p-6 mb-8">
        <AddRegionForm regions={regions} />
        <AddInstituteTypeForm />
      </div>

      <AddCustomerForm />

      <CustomerTable />
    </div>
  );
}
