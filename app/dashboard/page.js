import { getRecentActivities } from "@/actions/server-actions";
import AnimatedCard from "@/components/common/AnimatedCard";
import QuickStats from "@/components/dashboard/QuickStats";
import UserCard from "@/components/dashboard/user/UserCard";
import { getAllCustomer } from "@/data/query/customer";
import { getAllReports } from "@/data/query/reports";
import { getUser } from "@/data/query/user";

export default async function DashboardPage() {
  const activities = await getRecentActivities();
  const user = await getUser();
  const customer = await getAllCustomer();
  const service = await getAllReports({ report: "outreach", filter: "3" });
  const follow = await getAllReports({ report: "outreach", filter: "4" });

  return (
    <>
      {/* Dashboard Cards */}
      <UserCard
        user={user.length}
        customer={customer.length}
        service={service.length}
        follow={follow.length}
      />

      {/* Activity Section */}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatedCard className="md:col-span-2 mt-10 border  bg-secondary/30  border-border   p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className=" overflow-x-auto">
            <table className="min-w-full border-collapse text-[var(--text)] text-left">
              <thead>
                <tr className="bg-[var(--surfaceHighlight)] border-b border-[var(--border)]">
                  <th className="py-3 px-4 text-[var(--muted)] text-sm font-medium uppercase">
                    Name
                  </th>
                  <th className="py-3 px-4 text-[var(--muted)] text-sm font-medium uppercase whitespace-nowrap">
                    Action
                  </th>
                  <th className="py-3 px-4 text-[var(--muted)] text-sm font-medium uppercase">
                    Target
                  </th>
                  <th className="py-3 px-4 text-[var(--muted)] text-sm font-medium uppercase">
                    On Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-[var(--accent-weak)] transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-[var(--accent)]">
                        {a.name}
                      </td>
                      <td className="py-3 px-4 text-[var(--muted)] whitespace-nowrap">
                        {a.action}
                      </td>
                      <td className="py-3 px-4 text-[var(--muted)] truncate max-w-xs">
                        {a.target}
                      </td>
                      <td className="py-3 px-4 text-[var(--muted)]">
                        {new Date(a.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 text-center text-[var(--muted)]"
                    >
                      No recent activity found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
        <QuickStats />
      </div>
    </>
  );
}
