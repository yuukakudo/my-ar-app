'use client'; // 👈 パス（URL）を取得するために必要です

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav"; 
import { usePathname } from "next/navigation"; // 👈 追加

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 🛡️ ガード処理：ログイン画面ではタブを表示しない
  // 今のURLが "/login" ではない時だけ showNav が true になる
  const showNav = pathname !== "/login";

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc]">
        {/* showNav が true（ログイン後）の時だけ、
           下に余白（pb-20）を作ってタブを配置する 
        */}
        <main className={`flex-grow ${showNav ? "pb-20" : ""}`}>
          {children}
        </main>

        {showNav && <BottomNav />}
      </body>
    </html>
  );
}