import type { Metadata } from "next";
import { Inter, Montaga, Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montaga = Montaga({
  variable: "--font-montaga",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vital AI - Your Personal Health Intelligence",
  description:
    "Upload a blood report, get clinically grounded analysis in seconds, and receive a personalised recovery plan with matched treatments. Join the waitlist.",
  openGraph: {
    title: "Vital AI - Your Personal Health Intelligence",
    description:
      "Upload a blood report, get clinically grounded analysis in seconds. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montaga.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-[100dvh]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
