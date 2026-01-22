import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import { PurchaseProvider } from "@/app/_components/PurchaseContext";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s / Car-Neek",
    default: "Welcome / Car-Neek",
  },
  description:
    "Exotic pre-owned cars, come check out the worlds most unique cars and suvs from all around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${geistSans.className} antialiased bg-slate-950 text-slate-50 min-h-screen flex flex-col relative`}
        >
          <Header />
          <div className="px-8 py-16 flex-1 grid">
            <main className="max-w-7xl mx-auto w-full">
              <PurchaseProvider>{children}</PurchaseProvider>
            </main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
