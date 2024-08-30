import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "@/styles/modern-normalize.css";
import "@/styles/globals.css";
import "@/styles/utils.css";

const lexend = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vault",
  description: "A simple web-based crypto wallet",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lexend.className}>
      <body>{children}</body>
    </html>
  );
}
