import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Office 2024 Configuration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased text-gray-800 bg-white`}>{children}</body>
    </html>
  );
}
