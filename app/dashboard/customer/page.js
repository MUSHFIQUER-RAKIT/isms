import AddCustomerForm from "@/components/dashboard/customer/AddCustomerForm";
import AddPropertyForm from "@/components/dashboard/customer/AddPropertyForm";
import {
  getAllCustomer,
  getAllInstitute,
  getAllRegion,
} from "@/data/query/customer";

export default async function CustomerPage() {
  const regions = await getAllRegion();
  const institutes = await getAllInstitute();
  const customers = await getAllCustomer();

  return (
    <div className="min-h-screen   text-[var(--color-foreground)]">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-accent)]">
        Customer Management
      </h1>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] flex gap-2 flex-col md:flex-row   rounded-xl p-6 mb-8">
        <AddPropertyForm title="Region" apiPath="region" items={regions} />

        <AddPropertyForm
          title="institute Type"
          apiPath="institute"
          items={institutes}
        />
      </div>

      <AddCustomerForm
        regions={regions}
        institutes={institutes}
        customers={customers}
      />
    </div>
  );
}
