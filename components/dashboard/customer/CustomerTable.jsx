export default function CustomerTable({ customers = [] }) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
        Customer List
      </h2>

      <table className="w-full border-collapse text-sm">
        <thead className="bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Region</th>
            <th className="p-2 text-left">Institution</th>
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
              <td className="p-2">{c.region}</td>
              <td className="p-2">{c.institution_type}</td>
              <td className="p-2 text-center">
                <button className="text-[var(--color-destructive)] hover:opacity-70">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
