"use client";

import { Button } from "@/components/common/Button";
import { FaEye } from "react-icons/fa";

export default function ({ outreachs = [] }) {
  return (
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
            <th className="p-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          {outreachs.map((o) => (
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
              <td className="p-2">
                {" "}
                {o.comment && (
                  <Button
                    onClick={() => alert(o.comment)}
                    variant="outline"
                    size="xs"
                  >
                    <FaEye />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
