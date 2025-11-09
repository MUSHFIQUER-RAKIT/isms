"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal({ children }) {
  const pathName = usePathname();
  const router = useRouter();
  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        router.back();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pathName]);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto flex items-center justify-center">
      <div ref={modalRef} className=" p-6 rounded-lg max-w-md  w-full">
        {children}
      </div>
    </div>
  );
}
