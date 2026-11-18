import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pendo Mtaani - Kenya Dating",
  description: "Location-based dating app for people in Kenya. Connect with nearby matches.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
