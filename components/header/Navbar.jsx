"use client";

import { getSiteSettings } from "@/actions/server-actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar({ data, session }) {
  const pathName = usePathname();

  const [siteName, setSiteName] = useState("");
  useEffect(() => {
    const fetch = async () => {
      let { site_name } = await getSiteSettings();
      setSiteName(site_name);
    };
    fetch();
  }, []);
  return (
    <>
      <Link href="/" className="group flex items-center gap-3">
        <Image src="/Logo.png" width={36} height={36} alt="LOGO" />
        <span className={`text-lg font-bold tracking-widetext-[var(--text)]`}>
          {siteName}
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm">
        {data?.map((item) =>
          session.user.role === "EMPLOYEE" &&
          item.name === "Add Employee" ? null : (
            <ul key={item?.id} className="relative">
              <li>
                <Link
                  href={item?.href}
                  className={`px-2 py-1 transition-colors ${
                    pathName === item?.href
                      ? "text-[var(--accent)]"
                      : "text-[var(--text)]"
                  } hover:text-[var(--accent)]`}
                >
                  {item?.name}
                </Link>
              </li>
            </ul>
          )
        )}
      </nav>
    </>
  );
}
