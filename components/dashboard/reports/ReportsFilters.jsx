"use client";

import { Button } from "@/components/common/Button";
import useOutsideClick from "@/hooks/useOutsideClick";
import { capitalizeFirstLetter } from "@/libs/capitalizeFirstLetter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaSync } from "react-icons/fa";
import FilterAccordion from "./FilterAccordion";

const sortOptions = [
  { id: "1", value: "Newest" },
  { id: "2", value: "This Week" },
  { id: "3", value: "This Month" },
  { id: "4", value: "This Year" },
  { id: "5", value: "Oldest" },
];

const report = ["region", "institute", "customer", "outreach"];

export default function ReportsFilters({ customer, createdBy, children }) {
  const filters = [
    {
      id: 1,
      name: "Created By",
      options: createdBy,
    },
    {
      id: 2,
      name: "Customer",
      options: customer,
    },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState();
  const [sortOpen, setSortOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const ref = useOutsideClick(() => setSortOpen(false));

  // --- FILTER HANDLER ---
  const handleFilter = (sectionId, option) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(sectionId, option);
    router.push(`?${params.toString()}`);
  };

  const activeSort = searchParams.get("sort");
  const reportSort = searchParams.get("report") || "region";
  const isCreated = searchParams.get("created");
  const isCustomer = searchParams.get("customer");

  const queryString = new URLSearchParams(searchParams.toString());
  const exportUrl = `/api/export?${queryString}`;

  function onDeleteParams(name) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    router.push(`?${params.toString()}`);
  }
  return (
    <div className="text-[var(--color-foreground)]">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 w-72 bg-[var(--color-card)]  border-l border-[var(--color-border)]  p-5 shadow-md  z-50 transform transition-transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={() => setMobileOpen(false)}>
            {/* X Icon */}
            <svg
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Filters */}
        {filters.map((section) => (
          <div key={section.id} className="border-b py-3">
            <button
              onClick={() =>
                setOpenSection(openSection === section.id ? null : section.id)
              }
              className="flex justify-between w-full text-left font-medium "
            >
              {section.name}
              <span>
                {openSection === section.id ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </span>
            </button>

            {openSection === section.id && (
              <div className="mt-3 pl-2 space-y-2 animate-fadeIn">
                {section.options.map((opt) => (
                  <label key={opt.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-400"
                    />
                    {opt.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <main className="text-[var(--color-foreground)] ">
        <div className="bg-[var(--color-card)]  border border-[var(--color-border)] rounded-xl p-5 shadow-md flex flex-col lg:flex-row justify-between border-b pb-4 mb-6 items-center">
          <h1 className=" lg:text-2xl font-semibold text-[var(--color-accent)] tracking-wide">
            Get Work Reports
          </h1>

          <div className="flex mt-2 lg:gap-4 items-center">
            {/* Restet Icon */}

            <Button
              onClick={() => router.replace(pathName)}
              variant="link"
              size="xs"
            >
              <FaSync /> Reset filter
            </Button>
            <Button onClick={() => router.push(exportUrl)} variant="primary">
              <BsFiletypeXlsx /> Export Report
            </Button>
            {/* Sort Dropdown */}
            <div ref={ref} className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1  text-sm font-medium hover:text-[var(--color-foreground)]/70"
              >
                Sort
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 bg-primary shadow-lg border rounded w-40 text-sm z-20">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      value={opt.id}
                      onClick={() => handleFilter("sort", opt.id)}
                      className={`w-full text-left p-3 rounded ${
                        activeSort === opt.id && "bg-[var(--color-accent)]"
                      } hover:bg-[var(--color-accent)]`}
                    >
                      {opt.value}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 hover:text-[var(--color-foreground)]/70 rounded lg:hidden"
            >
              {/* Funnel icon */}
              <svg
                className="w-5 h-5 "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 h- lg:grid-cols-4 gap-8">
          {/* Content Panel */}
          <div className="lg:col-span-3">{children}</div>

          {/* Desktop Filters */}
          <aside className="hidden bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-md lg:block space-y-6">
            <h1 className=" text-center bg-white/50 border border-[var(--color-border)] rounded-xl p-2">
              Select Report
            </h1>
            <div className="text-sm">
              {report.map((opt, i) => (
                <button
                  key={i}
                  value={opt}
                  onClick={() => handleFilter("report", opt)}
                  className={`w-full text-left p-3 rounded ${
                    reportSort === opt && "bg-[var(--color-accent)]"
                  } hover:bg-[var(--color-accent)]/50`}
                >
                  {capitalizeFirstLetter(opt)}
                </button>
              ))}
            </div>
            <FilterAccordion
              name="Created By"
              value="created"
              options={createdBy}
              handleFilter={handleFilter}
              isIn={isCreated}
              handleDelete={onDeleteParams}
            />
            {reportSort === "outreach" && (
              <FilterAccordion
                name="Customer"
                value="customer"
                options={customer}
                handleFilter={handleFilter}
                isIn={isCustomer}
                handleDelete={onDeleteParams}
              />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
