import Pagination from "@/components/common/Pagination";
import AddCustomerForm from "@/components/dashboard/customer/AddCustomerForm";
import AddPropertyForm from "@/components/dashboard/customer/AddPropertyForm";
import { getAllInstitute, getAllRegion } from "@/data/query/customer";
import { getAllReports } from "@/data/query/reports";

export default async function CustomerPage({ searchParams }) {
  const regions = await getAllRegion();
  const institutes = await getAllInstitute();

  const params = await searchParams;

  const { data, pagination } = await getAllReports(
    { ...params, report: "customer" },
    10,
    Number(params.page) || 1
  );
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
        customers={data}
      />
      <Pagination pagination={pagination} />
    </div>
  );
}
