import type { Metadata } from "next";
import { Montaga, Geist } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

// Two-font system: Geist (sans, body) + Montaga (serif, display).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montaga = Montaga({
  variable: "--font-montaga",
  weight: "400",
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
      className={`${geistSans.variable} ${montaga.variable} antialiased`}
    >
      <body className="min-h-[100dvh]" suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
