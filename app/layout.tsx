import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://raphaelmansueto.com";
const title = "Raphael Mansueto | Full Stack AI Engineer";
const description =
  "Full Stack AI Engineer. Multi-agent pipelines, LLM orchestration, and RAG systems that run in production, not demos. Based in Cebu, Philippines.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Raphael Mansueto",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@raphaeljamesm",
  },
  other: {
    "theme-color": "#09090b",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full", "antialiased", geistMono.variable, "font-sans", inter.variable)}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
