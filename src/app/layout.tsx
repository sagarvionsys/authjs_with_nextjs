"use client";

import Header from "@/components/Navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import React from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <Toaster position="top-right" />
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
