import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ElasticScroll from "@/components/ElasticScroll";
import UnicornBg from "@/components/UnicornBg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Study Companion",
  description: "Minimal AI-powered study platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        <div
        className="w-full h-full fixed inset-0 -z-10 overflow-hidden">
        <UnicornBg /></div>
      

        {/* Smooth scrolling wrapper */}
        <SmoothScroll>
  <ElasticScroll>
    <Navbar />
    {children}
  </ElasticScroll>
</SmoothScroll>
      </body>
    </html>
  );
}
