"use client";
import { getSiteSettings } from "@/actions/server-actions";
import useOutsideClick from "@/hooks/useOutsideClick";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaCog,
  FaRegListAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaTable,
  FaUserFriends,
} from "react-icons/fa";

export default function Aside({ user }) {
  const menuItems = [
    { icon: <FaRegListAlt />, label: "Overview", href: "/dashboard" },
    {
      icon: <FaShoppingCart />,
      label: "Customer",
      href: "/dashboard/customer",
    },
    { icon: <FaTable />, label: "Outreach", href: "/dashboard/outreach" },
    { icon: <FaUserFriends />, label: "Account", href: "/dashboard/account" },
    { icon: <FaCog />, label: "Settings", href: "/dashboard/settings" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const outsideRef = useOutsideClick(() => setIsSidebarOpen(false));

  const [siteName, setSiteName] = useState("");
  useEffect(() => {
    const fetch = async () => {
      let { site_name } = await getSiteSettings();
      setSiteName(site_name);
    };
    fetch();
  }, []);

  const pathName = usePathname();
  return (
    <div ref={outsideRef}>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-20 left-4 z-40 p-2 rounded-md lg:hidden 
               bg-sidebar-accent border border-border text-sidebar-foreground"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      <aside
        className={`
      fixed top-16 left-auto h-[calc(100vh-4rem)] w-64  border-r border-sidebar-border 
       bg-sidebar-background  text-sidebar-foreground  flex flex-col p-6 shadow-lg z-30
      transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0   lg:border-r 
    `}
      >
        <h2
          className={`font-bold mb-8 text-right lg:text-left text-lg transition-opacity duration-300`}
        >
          {siteName} Dashboard
        </h2>

        <nav className="h-full flex flex-col justify-between">
          <div className="flex flex-col  gap-2">
            {menuItems.map((item, idx) => (
              <Link
                href={item.href}
                key={idx}
                onClick={() => setIsSidebarOpen(false)}
                className={`${
                  pathName === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground "
                    : ""
                } flex items-center gap-3  p-2 rounded-xl cursor-pointer hover:bg-sidebar-accent`}
              >
                <span className="text-[var(--accent)] ">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="text-center ">
            <h1 className="text-[var(--text)] p-2 border-b border-border  ">
              {user?.email}
            </h1>

            <div className="flex ">
              <Link
                href="/dashboard/settings"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl cursor-pointer  hover:bg-sidebar-accent"
              >
                <span className="text-[var(--accent)] text-lg">
                  <FaCog />
                </span>
                <span>Settings</span>
              </Link>

              <button
                className=" pl-2 flex items-center gap-3 p-2 rounded-xl cursor-pointer  hover:bg-sidebar-accent hover:text-red-500"
                onClick={() => signOut()}
              >
                <span className=" text-red-500">
                  <FaSignOutAlt />
                </span>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}
