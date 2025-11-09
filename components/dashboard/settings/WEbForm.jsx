"use client";

import { getSiteSettings, updateSiteSettings } from "@/actions/server-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WEbForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    site_name: "",
    site_title: "",
    site_number: "",
  });
  const [isPending, setIsPending] = useState();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings();
      setFormData(data);
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(false);

    try {
      setIsPending(true);
      const form = new FormData();
      form.append("site_name", formData.site_name);
      form.append("site_title", formData.site_title);
      form.append("site_number", formData.site_number);

      await updateSiteSettings(form);

      toast.success("Setting Changed Successfully!\n Reloading page...");
      setIsPending(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="site_name" className="text-sm ">
          Website Name
        </label>
        <input
          type="text"
          id="site_name"
          name="site_name"
          value={formData.site_name}
          onChange={handleChange}
          className="border border-border  rounded-xl px-4 py-2 focus:border-[var(--accent)] outline-none transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="site_title" className="text-sm text-[var(--muted)]">
          Website Title
        </label>
        <input
          type="text"
          id="site_title"
          name="site_title"
          value={formData.site_title}
          onChange={handleChange}
          className="border border-border bg-[var(--background)] rounded-xl px-4 py-2 focus:border-[var(--accent)] outline-none transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="site_number" className="text-sm text-[var(--muted)]">
          What's app Number
        </label>
        <input
          type="text"
          id="site_number"
          name="site_number"
          value={formData.site_number}
          onChange={handleChange}
          className="border border-border bg-[var(--background)] rounded-xl px-4 py-2 focus:border-[var(--accent)] outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-accent text-white rounded-xl py-2 mt-4 transition hover:shadow-lg"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
