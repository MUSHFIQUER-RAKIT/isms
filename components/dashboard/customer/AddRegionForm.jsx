"use client";
import { Button } from "@/components/common/Button";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";

export default function AddRegionForm({ regions = [] }) {
  const [region, setRegion] = useState("");
  console.log(regions);

  return (
    <div className="flex flex-col w-1/2">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)] flex items-center gap-2">
        <FaPlus /> Add Region
      </h2>

      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Region"
            className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)]"
          />

          <button className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:opacity-80">
            Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {regions.map((r) => (
            <div
              key={r.id}
              className="p-3 flex  rounded-md bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]"
            >
              <div className="flex flex-col">
                {r.region}
                <span className="text-xs text-primary">
                  Created on {new Date(r.created_at).toLocaleDateString()} by{" "}
                  {r.created_by}
                </span>
              </div>
              <div className="flex gap-2 justify-center items-center ">
                <Button variant="destructive" size="xs">
                  <FaEdit />
                </Button>
                <Button variant="destructive" size="xs">
                  <FaTrashAlt />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
