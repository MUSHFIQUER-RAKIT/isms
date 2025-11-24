import { auth } from "@/auth";
import { getUserById } from "@/data/query/user";
import { getUiContent } from "@/libs/getUiContent";
import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import ThemeToggleBtn from "./ThemeToggleBtn";

export default async function Header() {
  const { navBar } = await getUiContent();
  const session = await auth();
  const u = await getUserById(session.user.id);


  return (
    <header className=" fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-border">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Navbar data={navBar} session={session} />
          <SessionProvider session={session}>
            <ThemeToggleBtn data={navBar} u={u} />
          </SessionProvider>
        </div>
      </div>
    </header>
  );
}
