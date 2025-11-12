"use client";

import { Button } from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import { capitalizeFirstLetter } from "@/libs/capitalizeFirstLetter";
import { useState } from "react";
import { FaPhone, FaSearch, FaUser } from "react-icons/fa";

export default function MakeCallUI({ customers = [] }) {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState({
    customer_id: "",
    customer_name: "",
    customer_phone: "",
    call_status: "",
    service_status: "",
    follow_up_date: "",
    note: "",
  });

  const [callStatus, setCallStatus] = useState("");
  const [serviceStatus, setServiceStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const entries = Object.entries(selectedCustomer);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  text-[var(--color-foreground)]">
      {/* Left Side — Control Panel */}
      <div className="flex flex-col gap-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-md">
        <h2 className="text-xl font-semibold text-[var(--color-accent)] flex items-center gap-2">
          <FaPhone /> Make a Call
        </h2>

        {/* Step 1: Search & Select Customer */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Find Customer</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pr-8 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <FaSearch className="absolute right-2 top-3 text-[var(--color-muted-foreground)]" />
          </div>
          <Divider text="or select" />

          <div className="flex flex-wrap  max-h-64 overflow-y-auto mt-2 border border-[var(--color-border)] rounded-md">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCustomer({
                      ...selectedCustomer,
                      customer_id: c.id,
                      customer_name: c.name,
                      customer_phone: c.phone,
                    });
                    setCallStatus("");
                    setServiceStatus("");
                    setFollowUpDate("");
                  }}
                  className={`p-2 w-1/2 flex gap-2 items-center  cursor-pointer  hover:bg-[var(--color-accent)]/20 transition-all ${
                    selectedCustomer?.customer_id === c.id
                      ? "bg-[var(--color-accent)]/30"
                      : "odd:border-r"
                  }`}
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
          </div>
        </div>

        {/* Step 2: Make Call */}
        {selectedCustomer.customer_id && !callStatus && (
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="primary"
              onClick={() => {
                setCallStatus("calling");
                setServiceStatus("");
              }}
            >
              📞 Make Call
            </Button>
          </div>
        )}

        {/* Step 3: Call Status */}
        {callStatus === "calling" && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Call Status</label>
            <div className="flex gap-3 flex-wrap">
              {["calling", "declined", "successed"].map((status) => (
                <Button
                  key={status}
                  onClick={() => setCallStatus(status)}
                  variant={callStatus === status ? "primary" : "outline"}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Service Status */}
        {callStatus === "successed" && (
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Service Status</label>
            <div className="flex gap-3 flex-wrap">
              {["accepted", "follow_up", "cancelled"].map((s) => (
                <Button
                  key={s}
                  onClick={() => setServiceStatus(s)}
                  variant={serviceStatus === s ? "primary" : "outline"}
                >
                  {s}
                </Button>
              ))}
            </div>

            {serviceStatus === "follow_up" && (
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
              />
            )}
          </div>
        )}
      </div>

      {/* Right Side — Dynamic Form / Summary */}
      <div className="bg-[var(--color-muted)] border border-[var(--color-border)] rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-[var(--color-accent)]">
          Call Summary
        </h3>

        {selectedCustomer.customer_id ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <FaUser className="text-[var(--color-accent)]" />

              {entries.map(
                ([key, value]) =>
                  value !== "" && (
                    <div
                      key={key}
                      className="bg-primary/30 p-3 rounded-md font-medium "
                    >
                      {capitalizeFirstLetter(key.replace("_", " "))}: {value}
                    </div>
                  )
              )}
            </div>

            <div className="border-t border-[var(--color-border)] my-2" />

            <div>
              <p className="text-sm font-semibold">Call Status:</p>
              <p className="capitalize">{callStatus || "Not started"}</p>
            </div>

            {callStatus === "successed" && (
              <div>
                <p className="text-sm font-semibold">Service Status:</p>
                <p className="capitalize">{serviceStatus || "Not selected"}</p>
              </div>
            )}

            {serviceStatus === "follow_up" && (
              <div>
                <p className="text-sm font-semibold">Follow Up Date:</p>
                <p>
                  {followUpDate
                    ? new Date(followUpDate).toLocaleDateString()
                    : "No date selected"}
                </p>
              </div>
            )}

            <div className="border-t border-[var(--color-border)] my-2" />

            <Button
              disabled={
                !callStatus || (callStatus === "successed" && !serviceStatus)
              }
            >
              💾 Save (UI Only)
            </Button>
          </div>
        ) : (
          <p className="text-[var(--color-muted-foreground)] italic">
            Select a customer to start making a call.
          </p>
        )}
      </div>
    </div>
  );
}
