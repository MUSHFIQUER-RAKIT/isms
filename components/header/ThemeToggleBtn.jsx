"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import EnterAnimation from "../animations/EnterAnimation";

export default function ThemeToggleBtn({ data, u }) {
  const pathName = usePathname();

  // user dropdown
  const [isOpen, setIsOpen] = useState(false);

  //logout user if not in db
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    setIsOpen(false);

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/dashboard/user");
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        const hasUser = data?.some((u) => u.id === session.user.id);
        if (!hasUser) {
          toast.warn("User not found in DB. Signing out...");
          signOut();
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };

    fetchUsers();
  }, [pathName, status, session?.user?.id]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div>
          {session && (
            <div className="hidden sm:inline-flex  items-center gap-3 relative">
              <div className="w-10 h-10 rounded-full  bg-primary/20 border text-primary flex items-center justify-center ">
                <FaUser />
              </div>
              <span className="text-foreground text-sm cursor-pointer">
                {u?.name}
              </span>
            </div>
          )}
        </div>

        <button
          className="md:hidden flex items-center   focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-secondary border-t-accent-foreground   shadow-lg border-t  z-40">
          <EnterAnimation>
            <nav className="flex flex-col space-y-1 p-4 bg-[radial-gradient(60%_60%_at_30%_20%,var(--bg-re))]">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center justify-between w-full">
                    <Link
                      href={item?.href}
                      className={`py-2 text-nowrap ${
                        pathName === item?.href ? "text-accent" : ""
                      }   hover:text-[var(--accent)]`}
                    >
                      {item?.name}
                    </Link>
                  </div>
                </div>
              ))}
            </nav>
          </EnterAnimation>
        </div>
      )}
    </div>
  );
}
