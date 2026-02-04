import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

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
        {/* Spline background */}
        <div className="fixed inset-0 -z-10">
          <iframe
            src="https://my.spline.design/thresholddarkambientui-v0gkZCfi6zXm69kE0wccy70f/"
            className="w-full h-full"
          />
        </div>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
