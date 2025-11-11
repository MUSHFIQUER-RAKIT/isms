"use client";
import { Button } from "@/components/common/Button";
import Input2 from "@/components/common/Input2";
import useApiActions from "@/hooks/useApiActions";
import { useState } from "react";
import { FaEdit, FaEye, FaTrashAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddCustomerForm({ regions, institutes, customers }) {
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
    region: "",
    institute: "",
  });
  const [editId, setEditId] = useState(null);

  const resetForm = () => {
    setEditId(null);
    setCustomerForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
      region: "",
      institute: "",
    });
  };

  const handleChange = (key, value) => {
    setCustomerForm((prev) => ({ ...prev, [key]: value }));
  };

  const dataAction = useApiActions();

  const addCustomer = async (e) => {
    e.preventDefault();
    if (!customerForm.name || !customerForm.region || !customerForm.institute)
      return toast.warning(`Please enter all field`);

    if (editId) {
      await dataAction(null, "PUT", { id: editId, ...customerForm }, resetForm);
    } else {
      await dataAction(null, "POST", customerForm, resetForm);
    }
  };

  async function handleDelete(id) {
    if (confirm(`Delete this customer?`))
      return await dataAction(null, "DELETE", { id });
  }

  return (
    <>
      <form
        onSubmit={addCustomer}
        className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)] flex items-center gap-2">
          <FaUser /> Add Customer
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <Input2 name="name" form={customerForm} change={handleChange} />
          <Input2 name="email" form={customerForm} change={handleChange} />
          <Input2 name="phone" form={customerForm} change={handleChange} />
          <Input2
            name="address"
            form={customerForm}
            change={handleChange}
            required={true}
          />

          <select
            value={customerForm.region}
            onChange={(e) => handleChange("region", e.target.value)}
            className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r.id} value={r.region}>
                {r.region}
              </option>
            ))}
          </select>
          <select
            value={customerForm.institute}
            onChange={(e) => handleChange("institute", e.target.value)}
            className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
          >
            <option value="">Select institute Type</option>
            {institutes.map((i) => (
              <option key={i.id} value={i.institute}>
                {i.institute}
              </option>
            ))}
          </select>

          <textarea
            value={customerForm.comment}
            onChange={(e) => handleChange("comment", e.target.value)}
            placeholder="Enter comment(optional)"
            className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
          />
        </div>

        <Button type="submit" variant="primary">
          {editId ? "Update Customer" : "Add Customer"}
        </Button>
      </form>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
          Customer List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm  ">
            <thead className="bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Region</th>
                <th className="p-2 text-left">institute</th>
                <th className="p-2 text-left">Created by</th>
                <th className="p-2 text-left">comment</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition"
                >
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.phone}</td>
                  <td className="p-2">
                    {c.region} {c.address && `(${c.address})`}
                  </td>
                  <td className="p-2">{c.institute}</td>
                  <td className="p-2">
                    {c.created_by} on{" "}
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {c.comment && (
                      <Button
                        onClick={() => alert(c.comment)}
                        variant="outline"
                        size="xs"
                      >
                        <FaEye />
                      </Button>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {editId === c.id ? (
                      <Button
                        onClick={() => {
                          setEditId(null);
                          resetForm();
                        }}
                        size="xs"
                        variant="ghost"
                      >
                        X
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditId(c.id);
                          setCustomerForm({
                            name: c.name,
                            email: c.email,
                            phone: c.phone,
                            address: c.address,
                            comment: c.comment,
                            region: c.region,
                            institute: c.institute,
                          });
                        }}
                        size="xs"
                      >
                        <FaEdit />
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(c.id)}
                      variant="destructive"
                      size="xs"
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
