"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileCardDropDown({ employeeId }) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleDelete = async (employeeId) => {
    if (
      !window.confirm(
        `Are you sure you want to delete employee ID ${employeeId}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/employee/${employeeId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Deletion failed.");
      }

      router.refresh("/");
      toast(data.message);
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <div className="flex justify-end px-4 pt-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div
        className={`z-10 ${
          isOpen ? "hidden" : "flex"
        } text-base absolute top-14 list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
      >
        <ul className="py-2">
          <li className="w-full">
            <a
              href="#"
              className=" block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Edit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Export Data
            </a>
          </li>
          <li>
            <button
              onClick={() => handleDelete(employeeId)}
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
