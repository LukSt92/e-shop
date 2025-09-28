import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProv from "@/components/layout/SessionProv";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusHub",
  description: "E-shop created for educational purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen max-w-[1440px] mx-auto flex flex-col`}
      >
        <SessionProv>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProv>
      </body>
    </html>
  );
}
