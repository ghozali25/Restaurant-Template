import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarab - Fast Food & Restaurant",
  description: "Sarab - Fast Food & Restaurant Next.js App with Odoo Integration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@700&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#444]">{children}</body>
    </html>
  );
}
