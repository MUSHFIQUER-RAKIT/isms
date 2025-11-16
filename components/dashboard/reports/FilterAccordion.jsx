"use client";

import { Button } from "@/components/common/Button";
import useOutsideClick from "@/hooks/useOutsideClick";
import { capitalizeFirstLetter } from "@/libs/capitalizeFirstLetter";
import { useState } from "react";

export default function FilterAccordion({
  name,
  value,
  options,
  handleFilter,
  isIn,
  handleDelete,
}) {
  const [openSection, setOpenSection] = useState(false);
  const ref = useOutsideClick(() => setOpenSection(false));
  return (
    <>
      <div ref={ref} className="border-b flex flex-col   gap-3 pb-4 relative ">
        <button
          onClick={() => setOpenSection(!openSection)}
          className="flex justify-between w-full h-full hover:bg-accent/10 rounded p-2 font-medium "
        >
          <div>
            <span>
              {openSection ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </span>
          </div>

          {name}
        </button>
        {isIn && (
          <Button
            onClick={() => handleDelete(value)}
            className=" absolute top-3 left-7"
            variant="link"
          >
            X
          </Button>
        )}

        {openSection && (
          <div className="mt-3 max-h-48 overflow-y-auto text-xs flex flex-wrap gap-2  space-y-2">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() =>
                  handleFilter(
                    value,
                    name === "Get by role" ? opt.name : opt.id
                  )
                }
                className={`flex  flex-col text-left p-2 rounded ${
                  Number(isIn) === opt.id
                    ? "bg-[var(--color-accent)]/50"
                    : isIn === opt.name
                    ? "bg-[var(--color-accent)]/50"
                    : "bg-primary/30"
                }  hover:bg-[var(--color-accent)]/50`}
              >
                {capitalizeFirstLetter(opt.name)}
                <span> {opt.phone} </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
