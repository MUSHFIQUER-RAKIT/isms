"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useApiActions() {
  const router = useRouter();

  const dataAction = async (path, method, payload, callback) => {
    try {
      const res = await fetch(
        `/api/dashboard/customer${path ? `/${path}` : ""}`,
        {
          method: method || "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.error || "Failed to post data");
      }

      toast.success(data.message);
      if (callback) {
        callback();
      }
      router.refresh();
      return data;
    } catch (error) {
      console.error("POST error:", error.message);
    }
  };

  return dataAction;
}
