"use client";

import Plasma from "@/components/animations/Plasma";
import AnimatedCard from "@/components/common/AnimatedCard";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LoadingTop from "@/components/common/LoadingTop";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh("/");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen   flex items-center justify-center relative ">
      <Plasma
        color="#6e1ce9"
        speed={0.2}
        direction="forwads"
        scale={2.5}
        opacity={1}
        mouseInteractive={true}
        className="w-full h-full overflow-hidden  absolute inset-0   "
      />
      <AnimatedCard
        animation="fade-up"
        delay={0.1}
        className="glass-card  p-8 space-y-6  transition-all duration-700 delay-100 rounded-2xl shadow-xl w-full max-w-md absolute pointer-events-none "
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-center mb-6 text-foreground"
        >
          Login to Your Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Label label="Email">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </Label>

          <Label label="Password">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Label>

          {error && (
            <p className="text-center p-0 text-red-600 rounded-sm">{error}</p>
          )}

          <Button className=" w-full">Login</Button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground"
        >
          sign-in to your account and start the adventure
        </motion.p>

        {isLoading && <LoadingTop />}
      </AnimatedCard>
    </section>
  );
}
