"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ReportsPage({ data = [] }) {
  const [filters, setFilters] = useState({
    report_type: "",
    customer_name: "",
    created_by: "",
    sort: "latest",
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  const updateFilter = (key, value) => {
    const copy = { ...filters, [key]: value };
    setFilters(copy);
  };

  const reportTypes = ["outreach", "customer", "region", "institute"];
  const sampleCustomers = ["Mushfiquer Rakit", "John Doe", "Robin", "Ayaan"];
  const createdByList = ["Admin", "Support", "Sales Team"];

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[var(--color-accent)] tracking-wide">
        Reports
      </h1>

      {/* FILTER BAR */}
      <div className="flex items-center gap-6 p-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-sm">
        {/* Report Type */}
        <FilterDropdown
          label="Report"
          open={openDropdown === "report"}
          onToggle={() => toggleDropdown("report")}
        >
          {reportTypes.map((type) => (
            <DropItem
              key={type}
              label={type}
              active={filters.report_type === type}
              onClick={() => updateFilter("report_type", type)}
            />
          ))}
        </FilterDropdown>

        {/* Customer Name */}
        <FilterDropdown
          label="Customer"
          open={openDropdown === "customer"}
          onToggle={() => toggleDropdown("customer")}
        >
          {sampleCustomers.map((name) => (
            <DropItem
              key={name}
              label={name}
              active={filters.customer_name === name}
              onClick={() => updateFilter("customer_name", name)}
            />
          ))}
        </FilterDropdown>

        {/* Created By */}
        <FilterDropdown
          label="Created By"
          open={openDropdown === "created_by"}
          onToggle={() => toggleDropdown("created_by")}
        >
          {createdByList.map((c) => (
            <DropItem
              key={c}
              label={c}
              active={filters.created_by === c}
              onClick={() => updateFilter("created_by", c)}
            />
          ))}
        </FilterDropdown>

        {/* Sort */}
        <FilterDropdown
          label="Sort"
          open={openDropdown === "sort"}
          onToggle={() => toggleDropdown("sort")}
        >
          <DropItem
            label="latest"
            active={filters.sort === "latest"}
            onClick={() => updateFilter("sort", "latest")}
          />
          <DropItem
            label="oldest"
            active={filters.sort === "oldest"}
            onClick={() => updateFilter("sort", "oldest")}
          />
        </FilterDropdown>
      </div>

      {/* TABLE */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-md p-4">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-border)]">
            <tr className="text-left text-[var(--color-muted-foreground)]">
              <th className="p-2">ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Created By</th>
              <th className="p-2">Type</th>
              <th className="p-2">Created At</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-[var(--color-muted-foreground)] italic"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition"
                >
                  <td className="p-2">{row.id}</td>
                  <td className="p-2">{row.customer_name}</td>
                  <td className="p-2">{row.created_by}</td>
                  <td className="p-2">{row.report_type}</td>
                  <td className="p-2">{row.created_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* DROPDOWN WRAPPER */
function FilterDropdown({ label, open, onToggle, children }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 bg-[var(--color-input)] border border-[var(--color-border)] rounded-md shadow-sm text-sm"
      >
        {label}
        <FaChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute mt-2 w-44 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-xl p-2 z-20">
          {children}
        </div>
      )}
    </div>
  );
}

/* DROPDOWN ITEM */
function DropItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 rounded-md cursor-pointer text-sm 
        ${
          active
            ? "bg-[var(--color-accent)] text-white"
            : "hover:bg-[var(--color-muted)]"
        }
      `}
    >
      {label}
    </div>
  );
}
