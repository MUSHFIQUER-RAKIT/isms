import { auth } from "@/auth";
import Aside from "@/components/Aside";
import Header from "@/components/header/Header";
import { getUserById } from "@/data/query/user";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  const u = await getUserById(session.user.id);

  return (
    <>
      <Header />
      <main className="flex min-h-screen pt-16   relative  overflow-hidden">
        <Aside user={u} />
        {/* Main Content */}
        <section className="flex-1 w-full p-8 lg:ml-64 mt-10 lg:mt-0">
          {children}
        </section>
      </main>
    </>
  );
}
