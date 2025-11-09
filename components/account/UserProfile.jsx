"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit3, FiKey, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { Button } from "../common/Button";

const UserProfile = ({ user }) => {
  const router = useRouter();

  // STATES
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [passForm, setPassForm] = useState({ old: "", new: "", con: "" });
  const [formData, setFormData] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    designation: user?.designation || "",
    phone: user?.phone || "",
  });

  // HANDLERS
  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handlePassChange = (field, value) =>
    setPassForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setFormData({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      designation: user?.designation,
    });
    setPassForm({ old: "", new: "", con: "" });
    setError(null);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      return toast.error("Name and email are required");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          designation: formData.designation,
          role: user.role,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      toast.success("User updated successfully");
      router.refresh();
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPasswordChange = async () => {
    setError(null);

    if (!passForm.old || !passForm.new || !passForm.con)
      return setError("All password fields are required");

    if (passForm.new !== passForm.con)
      return setError("Confirm password doesn’t match");

    try {
      const res = await fetch("/api/dashboard/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          oldPassword: passForm.old,
          newPassword: passForm.new,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Password change failed");
      }

      toast.success("Password changed successfully");
      setPassForm({ old: "", new: "", con: "" });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // --- Form when editing ---
  const renderForm = () => (
    <div className="flex flex-col lg:flex-row lg:space-x-8 transition-all duration-300">
      {/* Left: Personal Info */}
      <div className="flex-1 space-y-4 transition-all duration-500">
        <h3 className="text-xl font-bold text-[var(--color-accent)] mb-4">
          Personal Information
        </h3>

        {["name", "email", "designation", "phone"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value.toString())}
            placeholder={
              field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
            }
            className="w-full bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-border)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200"
          />
        ))}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={resetForm} variant="glass">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Right: Password Section */}
      <div className="flex-1 mt-8 lg:mt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-[var(--color-border)]">
        <h3 className="text-[var(--color-accent)] mb-3 font-semibold flex items-center">
          <FiKey className="mr-2 text-[var(--color-accent)]" /> Change Password
        </h3>

        {["old", "new", "con"].map((field) => (
          <input
            key={field}
            type="password"
            value={passForm[field]}
            onChange={(e) => handlePassChange(field, e.target.value)}
            placeholder={
              field === "old"
                ? "Current Password"
                : field === "new"
                ? "New Password"
                : "Confirm New Password"
            }
            className="w-full bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-border)] rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200"
          />
        ))}

        {error && <p className="text-sm text-red-400 mb-2">{error}</p>}

        <Button variant="primary" onClick={onPasswordChange}>
          Update Password
        </Button>
      </div>
    </div>
  );

  // --- Component Layout ---
  return (
    <div className="p-8 w-full max-w-3xl border border-[var(--color-border)] bg-[var(--color-card)]/70 backdrop-blur-xl rounded-xl shadow-lg shadow-[var(--color-primary)]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-[var(--color-border)]">
        <h2 className="md:text-2xl text-[var(--color-foreground)] flex items-center">
          <FiUser className="mr-3 text-[var(--color-accent)]" />
          My Profile as{" "}
          <span className="ml-2 font-bold text-[var(--color-accent)] capitalize">
            {user.role}
          </span>
        </h2>

        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <FiEdit3 className="mr-2" /> Edit
          </Button>
        )}
      </div>

      {/* Profile Info or Edit Form */}
      {!isEditing ? (
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold text-[var(--color-accent)] mb-4">
              Personal Information
            </h3>
            {[
              ["Name", user.name],
              ["Email", user.email],
              ["Designation", user.designation || "N/A"],
              ["Phone", user.phone || "N/A"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between py-2 border-b border-[var(--color-border)] text-[var(--color-foreground)]"
              >
                <span className="opacity-80">{label}</span>
                <span className="text-[var(--color-accent)] font-medium">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default UserProfile;
