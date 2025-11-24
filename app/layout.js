import { getSiteSettings } from "@/actions/server-actions";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter();
const { site_name } = await getSiteSettings();

export const metadata = {
  title: site_name || "Isms - Dashboard",
  description: "A Website For Employee and customer",
};

export default async function RootLayout({ children, modal }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        cz-shortcut-listen="true"
        className={`${inter.className}   antialiased min-h-screen  `}
      >
        <ToastContainer position="bottom-right" autoClose={2000} />
        {modal}
        {children}
      </body>
    </html>
  );
}
