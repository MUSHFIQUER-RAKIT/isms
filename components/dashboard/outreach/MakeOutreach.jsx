"use client";
import { Button } from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import LoadingTop from "@/components/common/LoadingTop";
import { capitalizeFirstLetter } from "@/libs/capitalizeFirstLetter";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhone, FaSearch, FaSync } from "react-icons/fa";
import { FcPhone } from "react-icons/fc";
import { toast } from "react-toastify";

export default function MakeCallUI({ customers = [] }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({
    customer_id: "",
    customer_name: "",
    customer_phone: "",
    call_status: "",
    service_status: "",
    follow_up_date: "",
    note: "",
  });
  function resetCustomer() {
    setSelectedCustomer({
      customer_id: "",
      customer_name: "",
      customer_phone: "",
      call_status: "",
      service_status: "",
      follow_up_date: "",
      note: "",
    });
  }

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const entries = Object.entries(selectedCustomer);

  async function handleSave() {
    setLoading(false);
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/outreach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedCustomer),
      });
      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.error || "Failed to post outreach ");
      }

      toast.success(data.message);
      setLoading(false);
      resetCustomer();
      return data;
    } catch (error) {
      console.error("POST error:", error.message);
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  text-[var(--color-foreground)]">
      {/* LEFT PANEL — BEAUTIFUL + ANIMATED */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex flex-col gap-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold text-[var(--color-accent)] flex items-center gap-2"
        >
          <FaPhone /> Make a Call
        </motion.h2>

        <motion.div
          layout
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-2"
        >
          <label className="font-medium flex justify-between text-sm">
            Find Customer
            {selectedCustomer.call_status && (
              <Button onClick={resetCustomer} variant="link" size="xs">
                <FaSync /> Reset process
              </Button>
            )}
          </label>

          {/* Search Field */}
          <div className="relative">
            <input
              type="text"
              placeholder={
                selectedCustomer.call_status
                  ? "Reset process to select customer again"
                  : "Search by name or phone…"
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={!!selectedCustomer.call_status}
              className={`w-full p-2 pr-8 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]
        focus:ring-2 focus:ring-[var(--color-accent)]
        ${selectedCustomer.call_status && "opacity-50 cursor-not-allowed"}`}
            />
            <FaSearch className="absolute right-2 top-3 text-[var(--color-muted-foreground)]" />
          </div>

          <Divider text="or select" />

          {/* Customer List */}
          <motion.div
            layout
            transition={{ duration: 0.25 }}
            className={`flex flex-wrap h-64 overflow-y-auto mt-2 border  border-[var(--color-border)] rounded-md
        ${selectedCustomer.call_status && "opacity-50 pointer-events-none"}
      `}
          >
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      customer_id: c.id,
                      customer_name: c.name,
                      customer_phone: c.phone,
                    })
                  }
                  className={`p-2 w-1/2 flex gap-2 hover:bg-[var(--color-accent)]/10 items-center transition-all cursor-pointer
              ${
                selectedCustomer?.customer_id === c.id &&
                "bg-[var(--color-accent)]/30"
              }
              ${i % 2 === 0 && "border-r"}
            `}
                >
                  <span>{i + 1}</span>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">
                      phone: {c.phone}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-[var(--color-muted-foreground)]">
                No customers found.
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* STEP 2 — Make Call */}
        {selectedCustomer.customer_id && !selectedCustomer.call_status && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-3 mt-4"
          >
            <Button
              variant="primary"
              onClick={() =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  call_status: "calling",
                })
              }
            >
              Make Call
            </Button>
          </motion.div>
        )}

        {/* STEP 3 — Call Status */}
        {selectedCustomer.call_status === "calling" && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <label className="font-medium text-sm">Call Status :</label>
            <div className="flex gap-3 flex-wrap">
              {["calling", "declined", "successed"].map((status) => (
                <Button
                  key={status}
                  onClick={() =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      call_status: status,
                    })
                  }
                  className={status === "calling" && "animate-pulse"}
                  variant={status === "calling" ? "" : "glass"}
                >
                  {status === "calling" ? (
                    <>
                      <FcPhone style={{ transform: "rotate(270deg)" }} />
                      {status}...
                    </>
                  ) : (
                    status
                  )}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 4 — Service Status */}
        {selectedCustomer.call_status === "successed" && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
          >
            <label className="font-medium text-sm">Service Status</label>

            <div className="flex gap-3 flex-wrap">
              {["accepted", "follow_up", "cancelled"].map((s) => (
                <Button
                  key={s}
                  onClick={() =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      service_status: s,
                    })
                  }
                  variant={
                    selectedCustomer.service_status === s
                      ? "primary"
                      : "outline"
                  }
                >
                  {s}
                </Button>
              ))}
            </div>

            {selectedCustomer.service_status === "follow_up" && (
              <motion.input
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                type="date"
                value={selectedCustomer.follow_up_date || ""}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    follow_up_date: e.target.value,
                  })
                }
                className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
              />
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Right Side — Dynamic Form / Summary */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 shadow-lg relative">
        <h3 className="text-xl font-semibold mb-6 text-[var(--color-accent)] tracking-wide">
          Call Summary
        </h3>

        {selectedCustomer.customer_id ? (
          <div className="flex flex-col gap-6">
            {/* Customer Info */}
            <div className="flex flex-col gap-3 bg-[var(--color-muted)] p-4 rounded-lg border border-[var(--color-border)] shadow-sm">
              <div className="flex items-center gap-2 text-[var(--color-accent)] font-medium">
                <span>Customer Info</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {entries.map(
                  ([key, value]) =>
                    value !== "" && (
                      <div
                        key={key}
                        className="bg-[var(--color-input)] p-3 rounded-md border border-[var(--color-border)] shadow-sm"
                      >
                        <span className="font-semibold">
                          {capitalizeFirstLetter(key.replace("_", " "))}
                        </span>
                        : {value}
                      </div>
                    )
                )}
              </div>
            </div>

            {selectedCustomer.call_status && (
              <>
                <textarea
                  value={selectedCustomer.note}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      note: e.target.value,
                    })
                  }
                  placeholder="Write a note (optional)..."
                  className="p-3 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] shadow-sm min-h-[120px]"
                />

                <Button onClick={handleSave}>Save in database</Button>
              </>
            )}
          </div>
        ) : (
          <p className="text-[var(--color-muted-foreground)] italic text-center py-10">
            Select a customer to start making a call.
          </p>
        )}
        {loading && <LoadingTop />}
      </div>
    </div>
  );
}
