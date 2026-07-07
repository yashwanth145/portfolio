import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.vercel.app"),
  title: "Yashwanth Reddy S | Full Stack & AI Engineer",
  description:
    "Portfolio of Yashwanth Reddy S — full-stack development, AI systems, cloud engineering, and elegant product experiences.",
  openGraph: {
    title: "Yashwanth Reddy S | Full Stack & AI Engineer",
    description:
      "Building intelligent systems across web, mobile, cloud, and machine learning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
