"use client";
import Header from "@/components/Navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`antialiased`}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <Toaster />
            {children}
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
