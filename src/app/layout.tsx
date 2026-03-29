import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "参数化逻辑美学作品集",
  description: "基于Next.js与Three.js构建的极简互动简历",
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col relative bg-[#0a0a0a] text-[#ededed]">
        <ThreeBackground />
        <Navbar />
        <main className="relative z-10 flex-grow w-full flex flex-col pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
