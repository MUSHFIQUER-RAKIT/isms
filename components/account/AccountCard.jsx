"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "../common/Button";
import Input from "../common/Input";

export default function AccountCard({ employees, isEmployee }) {
  const router = useRouter();
  //handle delete user
  const handleDeleteUser = async (id) => {
    if (confirm("Delete this user?")) {
      await fetch("/api/dashboard/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Employee deleted successfully");
      router.refresh();
    }
  };

  //STATES
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassChange, setIsPassChange] = useState(false);
  const [error, setError] = useState(null);
  const [passForm, setPassForm] = useState({ old: "", new: "", con: "" });
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    designation: "",
    phone: "",
  });

  // HANDLER
  const resetForm = () => {
    setFormData({ id: "", name: "", email: "" });
    setEditingId(null);
    setPassForm({ old: "", new: "", con: "" });
    setIsPassChange(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePassChange = (field, value) => {
    setPassForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      designation: user.designation || "",
      phone: user.phone || "",
    });
  };

  // EDIT USER
  const onEditUser = async () => {
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
          role: formData.role,
          designation: formData.designation,
          phone: formData.phone,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      toast.success("User updated successfully");
      router.refresh();
      resetForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  //PASSWORD CHANGE
  const onPasswordChange = async (id) => {
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
          id,
          oldPassword: passForm.old,
          newPassword: passForm.new,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Password change failed");
      }

      setIsPassChange(true);
      toast.success("Password changed successfully");
      setPassForm({ old: "", new: "", con: "" });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsPassChange(true);
    }
  };

  // RENDER FORM
  const renderForm = () => (
    <div className="flex flex-col justify-center px-4 py-5 gap-4 bg-[var(--color-card)] text-[var(--color-card-foreground)] rounded-xl shadow-lg border border-[var(--color-border)] transition-all duration-300">
      {/* Avatar */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)]">
        <FaUser className="text-2xl" />
      </div>

      {/* Inputs */}
      <Input
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Full Name"
        className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none transition-all"
      />
      <Input
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email"
        className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none transition-all"
      />
      <div className="flex">
        <Input
          value={formData.designation}
          onChange={(e) => handleChange("designation", e.target.value)}
          placeholder="Designation"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none transition-all"
        />
        <Input
          type="number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="Phone"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none transition-all"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-3">
        <Button variant="outline" onClick={resetForm}>
          Cancel
        </Button>
        <Button onClick={onEditUser} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit"}
        </Button>
      </div>

      {/* Password Section */}
      <div className="flex flex-col gap-2 mt-4 border-t border-[var(--color-border)] pt-4">
        <h4 className="text-sm font-semibold text-[var(--color-accent)]">
          Change Password
        </h4>

        <Input
          value={passForm.old}
          onChange={(e) => handlePassChange("old", e.target.value)}
          placeholder="Old password"
          type="password"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none"
        />
        <Input
          value={passForm.new}
          onChange={(e) => handlePassChange("new", e.target.value)}
          placeholder="New password"
          type="password"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none"
        />
        <Input
          value={passForm.con}
          onChange={(e) => handlePassChange("con", e.target.value)}
          placeholder="Confirm password"
          type="password"
          className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring)] outline-none"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          onClick={() => onPasswordChange(formData.id)}
          disabled={isSubmitting}
        >
          {isPassChange ? "Password Changed" : "Change Password"}
        </Button>
      </div>
    </div>
  );

  // MAIN RETURN
  return (
    <div className="flex flex-row flex-wrap gap-6 justify-center lg:justify-start bg-[var(--color-background)] text-[var(--color-foreground)] p-6 rounded-xl">
      {employees.length > 0 ? (
        employees
          ?.map((user) => {
            const isEditing = editingId === user.id;
            return (
              <div
                key={user?.id}
                className="w-full  sm:w-40 lg:w-52  min-w-[250px] border border-[var(--color-border)] bg-[var(--color-card)] rounded-lg shadow-md hover:shadow-[var(--color-ring)]/30 transition-all duration-300"
              >
                {isEditing ? (
                  renderForm()
                ) : (
                  <div className="flex flex-col items-center p-6 sm:p-8 md:p-10 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)]">
                      <FaUser />
                    </div>

                    <h5 className="mt-3 mb-1 text-md sm:text-xl font-semibold text-[var(--color-foreground)]">
                      {user?.name}
                    </h5>
                    <span className="text-xs sm:text-sm text-[var(--color-muted-foreground)] truncate max-w-full">
                      {user?.email}
                    </span>

                    {!isEmployee && (
                      <div className="flex mt-4 md:mt-6 justify-center gap-2">
                        <Button size="sm" onClick={() => handleEdit(user)}>
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user?.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
          .reverse()
      ) : (
        <h3 className="mx-auto p-5">No employees registered yet</h3>
      )}
    </div>
  );
}
