"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function AddInstituteTypeForm({ properties = [] }) {
  const [institute, setInstitute] = useState("");
  return (
    <div className="flex flex-col w-1/2">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)] flex items-center gap-2">
        <FaPlus /> Add Institute Type
      </h2>

      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            placeholder="institute Type"
            className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)]"
          />

          <button className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:opacity-80">
            Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {properties.map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-md bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]"
            >
              {p.region} — {p.institute}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
