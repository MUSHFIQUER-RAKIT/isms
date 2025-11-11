export default function ({ outreachData = [] }) {
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
  );
}
