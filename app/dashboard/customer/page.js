import AddCustomerForm from "@/components/dashboard/customer/AddCustomerForm";
import AddPropertyForm from "@/components/dashboard/customer/AddPropertyForm";
import CustomerTable from "@/components/dashboard/customer/CustomerTable";
import { getAllInstitute, getAllRegion } from "@/data/query/customer";

export default async function CustomerPage() {
  const regions = await getAllRegion();
  const institute = await getAllInstitute();

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
          items={institute}
        />
      </div>

      <AddCustomerForm />

      <CustomerTable />
    </div>
  );
}
