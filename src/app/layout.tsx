import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400","500","600","700"] });

export const metadata: Metadata = {
  title: "Aymen Jr. — AI Engineer",
  description: "Aymen Jr. is an AI Engineer and independent builder creating intelligent systems for e-commerce and beyond.",
  openGraph: {
    title: "Aymen Jr. — AI Engineer",
    description: "AI Engineer and independent builder. Intelligent systems for e-commerce and beyond.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
