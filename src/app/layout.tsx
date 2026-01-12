import type { Metadata } from "next";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import "./globals.css";


export const metadata: Metadata = {
  title: "Veterans@VT",
  description: "Veterans@VT Student Organization",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="min-h-screen flex flex-col">

        <Header />

        {/* Page Content */}
        <main className="flex-1  bg-white dark:bg-black">
          {children}
        </main>
        
        <Footer />

      </body>

    </html>
  );
}
