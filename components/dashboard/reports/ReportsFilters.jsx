"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ReportsFilters({ onFilter }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const [filters, setFilters] = useState({
    report_type: "",
    customer_name: "",
    created_by: "",
    sort: "latest",
  });

  const toggleDropdown = (key) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const applyFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);
  };

  return (
    <div className="flex items-center gap-6 bg-gray-50 p-4 border rounded-lg shadow-sm">
      {/* REPORT TYPE */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("report_type")}
          className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm"
        >
          Report
          <FaChevronDown size={12} />
        </button>

        {openDropdown === "report_type" && (
          <div className="absolute mt-2 bg-white border rounded-lg shadow-xl p-3 w-40 z-20">
            {["outreach", "customer", "region", "institute"].map((item) => (
              <div
                key={item}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() => applyFilter("report_type", item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOMER NAME */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("customer_name")}
          className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm"
        >
          Customer
          <FaChevronDown size={12} />
        </button>

        {openDropdown === "customer_name" && (
          <div className="absolute mt-2 bg-white border rounded-lg shadow-xl p-3 w-56 z-20">
            {["Mushfiquer Rakit", "John Doe", "Ayaan Malik"].map((name) => (
              <label
                key={name}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={filters.customer_name === name}
                  onChange={() => applyFilter("customer_name", name)}
                />
                {name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* CREATED BY */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("created_by")}
          className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm"
        >
          Created By
          <FaChevronDown size={12} />
        </button>

        {openDropdown === "created_by" && (
          <div className="absolute mt-2 bg-white border rounded-lg shadow-xl p-3 w-56 z-20">
            {["Admin", "Support Team", "Sales"].map((name) => (
              <label
                key={name}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={filters.created_by === name}
                  onChange={() => applyFilter("created_by", name)}
                />
                {name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* SORT */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("sort")}
          className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm"
        >
          Sort
          <FaChevronDown size={12} />
        </button>

        {openDropdown === "sort" && (
          <div className="absolute mt-2 bg-white border rounded-lg shadow-xl p-3 w-40 z-20">
            {["latest", "oldest"].map((option) => (
              <div
                key={option}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() => applyFilter("sort", option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
