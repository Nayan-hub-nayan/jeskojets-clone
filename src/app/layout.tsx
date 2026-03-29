import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jesko Jets | The Art of Flight",
  description: "Cinematic, scroll-driven luxury aviation website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050505] text-white">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
