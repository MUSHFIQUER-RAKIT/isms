"use client";

import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";
import { FaEdit, FaPhone, FaSave, FaTrashAlt } from "react-icons/fa";

export default function OutreachPage() {
  const [customers, setCustomers] = useState([{ id: 1, name: "Rakit" }]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [callStatus, setCallStatus] = useState("");
  const [serviceStatus, setServiceStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [outreachData, setOutreachData] = useState([]);

  // ✅ Fetch customers
  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch("/api/customer");
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, []);

  // ✅ Fetch outreach table
  async function fetchOutreach() {
    const res = await fetch("/api/outreach");
    const data = await res.json();
    setOutreachData(data);
  }

  useEffect(() => {
    fetchOutreach();
  }, []);

  // ✅ Save outreach record
  async function saveOutreach() {
    if (!selectedCustomer || !callStatus) return alert("Incomplete data");
    const payload = {
      customer_id: selectedCustomer.id,
      customer_name: selectedCustomer.name,
      customer_phone: selectedCustomer.phone,
      call_status: callStatus,
      service_status: serviceStatus || null,
      follow_up_date: followUpDate || null,
      created_by: "Admin", // replace with auth user
    };

    const res = await fetch("/api/outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Saved successfully!");
      setCallStatus("");
      setServiceStatus("");
      setFollowUpDate("");
      setSelectedCustomer(null);
      fetchOutreach();
    } else alert("Failed to save");
  }

  // ✅ Delete outreach record
  async function deleteOutreach(id) {
    if (!confirm("Delete this record?")) return;
    await fetch(`/api/outreach/${id}`, { method: "DELETE" });
    fetchOutreach();
  }

  return (
    <div className="p-6 flex flex-col gap-8 text-[var(--color-foreground)]">
      <h2 className="text-2xl font-bold text-[var(--color-accent)] flex items-center gap-2">
        <FaPhone /> Make a Call
      </h2>

      {/* Select Customer */}
      <div className="flex gap-3 items-center flex-wrap">
        <select
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
          onChange={(e) => {
            const id = Number(e.target.value);
            const customer = customers.find((c) => c.id === id);
            setSelectedCustomer(customer);
          }}
          value={selectedCustomer?.id || ""}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {selectedCustomer && (
          <div className="flex items-center gap-4">
            <div>
              <div className="font-medium">{selectedCustomer.name}</div>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {selectedCustomer.phone}
              </div>
            </div>
            <Button onClick={() => setCallStatus("calling")}>Make Call</Button>
          </div>
        )}
      </div>

      {/* Call Status Buttons */}
      {callStatus === "calling" && (
        <div className="flex gap-3">
          {["pending", "declined", "successed"].map((status) => (
            <Button
              key={status}
              variant={callStatus === status ? "primary" : "outline"}
              onClick={() => setCallStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      )}

      {/* Declined */}
      {callStatus === "declined" && (
        <Button variant="destructive" onClick={saveOutreach}>
          <FaSave /> Save in Database
        </Button>
      )}

      {/* Successed */}
      {callStatus === "successed" && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {["accepted", "follow_up", "cancelled"].map((s) => (
              <Button
                key={s}
                variant={serviceStatus === s ? "primary" : "outline"}
                onClick={() => setServiceStatus(s)}
              >
                {s}
              </Button>
            ))}
          </div>

          {serviceStatus === "follow_up" && (
            <input
              type="date"
              className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          )}

          <Button onClick={saveOutreach}>
            <FaSave /> Save in Database
          </Button>
        </div>
      )}

      {/* Outreach Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Outreach Records</h3>
        <table className="w-full border border-[var(--color-border)] rounded-md overflow-hidden">
          <thead className="bg-[var(--color-muted)] text-left">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Call Status</th>
              <th className="p-2">Service Status</th>
              <th className="p-2">Follow Up</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {outreachData.map((o) => (
              <tr
                key={o.id}
                className="border-t border-[var(--color-border)] hover:bg-[var(--color-muted)]"
              >
                <td className="p-2">{o.customer_name}</td>
                <td className="p-2">{o.customer_phone}</td>
                <td className="p-2 capitalize">{o.call_status}</td>
                <td className="p-2 capitalize">{o.service_status || "-"}</td>
                <td className="p-2">
                  {o.follow_up_date
                    ? new Date(o.follow_up_date).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-2 flex gap-2">
                  <Button size="xs" onClick={() => alert("Edit coming soon")}>
                    <FaEdit />
                  </Button>
                  <Button
                    size="xs"
                    variant="destructive"
                    onClick={() => deleteOutreach(o.id)}
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
  );
}
