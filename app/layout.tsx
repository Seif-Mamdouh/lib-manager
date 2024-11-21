import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/AdminUser/Providers";

export const metadata: Metadata = {
  title: "Library Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
