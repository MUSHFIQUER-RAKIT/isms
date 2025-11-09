"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function AddCustomerForm({ properties = [] }) {
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    institution_type: "",
  });

  const handleCustomerChange = (key, value) =>
    setCustomerForm((prev) => ({ ...prev, [key]: value }));

  const addCustomer = () => {
    if (
      !customerForm.name ||
      !customerForm.region ||
      !customerForm.institution_type
    )
      return;
    setCustomers((prev) => [...prev, { id: prev.length + 1, ...customerForm }]);
    setCustomerForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      region: "",
      institution_type: "",
    });
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)] flex items-center gap-2">
        <FaUser /> Add Customer
      </h2>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <input
          value={customerForm.name}
          onChange={(e) => handleCustomerChange("name", e.target.value)}
          placeholder="Name"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
        />
        <input
          value={customerForm.email}
          onChange={(e) => handleCustomerChange("email", e.target.value)}
          placeholder="Email"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
        />
        <input
          value={customerForm.phone}
          onChange={(e) => handleCustomerChange("phone", e.target.value)}
          placeholder="Phone"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
        />
        <input
          value={customerForm.address}
          onChange={(e) => handleCustomerChange("address", e.target.value)}
          placeholder="Address"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
        />
        <select
          value={customerForm.region}
          onChange={(e) => handleCustomerChange("region", e.target.value)}
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
        >
          <option value="">Select Region</option>
          {properties.map((p) => (
            <option key={p.id} value={p.region}>
              {p.region}
            </option>
          ))}
        </select>
        <select
          value={customerForm.institution_type}
          onChange={(e) =>
            handleCustomerChange("institution_type", e.target.value)
          }
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
        >
          <option value="">Select Institution Type</option>
          {properties.map((p) => (
            <option key={p.id} value={p.institution_type}>
              {p.institution_type}
            </option>
          ))}
        </select>
      </div>

      <button className="px-6 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:opacity-80">
        Add Customer
      </button>
    </div>
  );
}
