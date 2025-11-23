import CommentBtn from "@/components/common/CommentBtn";

function formatHeader(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(key, value) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  if (key.includes("_at") || key.includes("date")) {
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  }

  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value;
}

export default function ReportTable({ reports, reportType }) {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center p-8 bg-[var(--color-card)] shadow rounded-lg border border-border">
        <p className="text-lg font-semibold ">No {reportType} reports found.</p>
        <p className="">Try adjusting your filters.</p>
      </div>
    );
  }

  const columns = Object.keys(reports[0]);

  return (
    <div className="overflow-x-auto  shadow-xl rounded-lg bg-[var(--color-card)] ">
      <table className="min-w-full divide-y divide-foreground/50 ">
        <thead className="bg-border">
          <tr>
            {columns.map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-bold  uppercase tracking-wider"
              >
                {formatHeader(key)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="  divide-y divide-foreground/30">
          {reports.map((report, rowIndex) => (
            <tr
              key={report.id || rowIndex}
              className="odd:bg-accent/0 even:bg-accent/10  hover:bg-accent/50"
            >
              {columns.map((key) =>
                key === "comment" ? (
                  <td key={key} className="p-2">
                    {report.comment && <CommentBtn comment={report.comment} />}
                  </td>
                ) : (
                  <td
                    key={key}
                    className="px-6  py-4 text-foreground/70 whitespace-nowrap text-sm "
                  >
                    {formatValue(key, report[key])}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
