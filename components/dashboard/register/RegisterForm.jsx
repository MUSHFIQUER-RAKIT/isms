"use client";

import AnimatedCard from "@/components/common/AnimatedCard";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LoadingTop from "@/components/common/LoadingTop";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    designation: "",
    phone: "",
  });

  const handleChange = (e) => {
    setError(null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          designation: form.designation,
          phone: form.phone,
          role: "EMPLOYEE",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please check your input."
        );
      }

      toast.success("Registration Successful!");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        designation: "",
        phone: "",
      });
      router.back();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center ">
      <AnimatedCard
        animation="fade-up"
        delay={0.1}
        className="glass-card p-8 space-y-6 transition-all duration-700 delay-100 rounded-2xl shadow-xl w-full max-w-md absolute pointer-events-none"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-6 text-[var(--text)]"
        >
          Register a user
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Label label="Full Name">
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
            />
          </Label>

          <Label label="Email">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </Label>

          <div className="flex">
            <Label label="Designation">
              <Input
                type="text"
                name="designation"
                placeholder="e.g. Software Engineer"
                value={form.designation}
                onChange={handleChange}
                required={false}
              />
            </Label>

            <Label label="Phone Number">
              <Input
                type="number"
                name="phone"
                placeholder="e.g. +8801XXXXXXXXX"
                value={form.phone}
                onChange={handleChange}
                required={false}
              />
            </Label>
          </div>

          <Label label="Password">
            <Input
              type="password"
              name="password"
              placeholder="*****"
              value={form.password}
              onChange={handleChange}
            />
          </Label>

          <Label label="Confirm Password">
            <Input
              type="password"
              name="confirmPassword"
              placeholder="*****"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </Label>

          {error && (
            <p className="text-center bg-red-300 text-red-600 rounded-sm py-1 text-sm">
              {error}
            </p>
          )}

          <Button className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Button variant="link" onClick={() => router.back()}>
          Go back?
        </Button>

        {isLoading && <LoadingTop />}
      </AnimatedCard>
    </section>
  );
}
