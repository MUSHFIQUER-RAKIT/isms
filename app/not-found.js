import { getSiteSettings } from "@/actions/server-actions";
import Link from "next/link";

export default async function NotFound() {
  let { site_name } = await getSiteSettings();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-6 text-center">
      {/* Animated 404 */}
      <h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[6rem] md:text-[8rem] font-extrabold text-[var(--accent)] drop-shadow-[0_0_25px_var(--hoverglow)]"
      >
        404
      </h1>

      {/* Subtitle */}
      <h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl font-semibold"
      >
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-[var(--muted)]">
        The page you’re looking for might have been removed, renamed, or is
        temporarily unavailable.
        <br />
        Stay Connect With{" "}
        <span className="text-[var(--accent)]">{site_name}</span>
      </p>

      {/* Divider */}
      <div className="flex items-center justify-center w-full max-w-xs my-8">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent-weak)] to-transparent"></span>
        <span className="mx-3 text-[var(--muted)] text-sm">or</span>
        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent-weak)] to-transparent"></span>
      </div>

      {/* Back Home Button */}
      <div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-primary hover:opacity-90 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
