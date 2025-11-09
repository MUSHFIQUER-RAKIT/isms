import { auth } from "@/auth";
import AccountCard from "@/components/account/AccountCard";
import UserProfile from "@/components/account/UserProfile";
import { getUser, getUserById } from "@/data/query/user";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();
  const u = await getUserById(session.user.id);

  const employees = await getUser({ role: "EMPLOYEE" });

  return (
    <>
      <div className="mt-10  border border-border bg-secondary p-6 rounded-2xl">
        <UserProfile user={u} />
      </div>
      <div className="mt-10  border border-border bg-secondary p-6 rounded-2xl">
        <div className="flex flex-wrap justify-between mb-5">
          <h2 className=" text-lg font-semibold mb-4">Eployee&apos;s list</h2>
          <div>
            <span className="text-[var(--accent)] mr-3">
              Register an employee
            </span>
            <Link
              href="/register"
              className={`className="inline-flex items-center mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-[var(--color-accent-foreground)] bg-[var(--color-accent)]/70 rounded-lg hover:bg-[var(--color-accent)]/90`}
            >
              Register
            </Link>
          </div>
        </div>

        <AccountCard employees={employees} />
      </div>
    </>
  );
}
