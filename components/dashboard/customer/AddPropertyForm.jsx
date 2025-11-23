"use client";
import { Button } from "@/components/common/Button";
import useApiActions from "@/hooks/useApiActions";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddPropertyForm({ title, apiPath, items = [] }) {
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);

  const dataAction = useApiActions();

  async function handleSubmit() {
    if (!value.trim()) return toast.warning(`Please enter a ${title}`);

    if (editId) {
      await dataAction(apiPath, "PUT", { id: editId, [apiPath]: value }, () => {
        setValue("");
        setEditId(null);
      });
    } else {
      await dataAction(apiPath, "POST", { [apiPath]: value }, () =>
        setValue("")
      );
    }
  }

  async function handleDelete(id) {
    if (confirm(`Delete this ${title}?`))
      return await dataAction(apiPath, "DELETE", { id });
  }

  const result = items.some((a) => a[apiPath] === value)
    ? items.filter((a) => a[apiPath] === value)
    : items;

  return (
    <div className="flex flex-col w-full ">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)] flex items-center gap-2">
        <FaPlus /> Add {title}
      </h2>

      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            name="name"
            value={value}
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            placeholder={`Search or Add ${title}`}
            className="p-2 w-2/3  rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)]"
          />

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="primary"
            size="md"
          >
            {editId ? "Update" : "Add"}
          </Button>
        </div>

        <div className="grid  grid-cols-1 lg:grid-cols-2  xl:grid-cols-3  gap-2 max-h-96 overflow-y-auto">
          {result.map((item) => (
            <div
              key={item.id}
              className="p-3 flex justify-between rounded-md bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]"
            >
              <div className="flex flex-col text-wrap">
                <span className=" max-w-36 overflow-hidden">
                  {item[apiPath]}
                </span>

                <span className="text-xs text-[var(--color-accent)]">
                  Created on {new Date(item.created_at).toLocaleDateString()} by{" "}
                  {item.created_by}
                </span>
              </div>

              <div className="flex gap-2 justify-center items-center">
                {editId === item.id ? (
                  <Button
                    onClick={() => {
                      setEditId(null);
                      setValue("");
                    }}
                    size="xs"
                    variant="ghost"
                  >
                    X
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setEditId(item.id);
                      setValue(item[apiPath]);
                    }}
                    size="xs"
                  >
                    <FaEdit />
                  </Button>
                )}

                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="destructive"
                  size="xs"
                >
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
