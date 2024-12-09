import Header from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`antialiased`}>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
