import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const posterGothic = localFont({
  src: "../../public/fonts/PosterGothicRoundATF-Heavy.woff2",
  variable: "--font-poster-gothic",
  weight: "800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Get Lucky × Dean Burmester — A Founding Partnership",
  description:
    "An invitation to Dean Burmester: take an equity stake in Get Lucky Golf and help turn South Africa's insurance-backed hole-in-one challenge into a global platform.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${posterGothic.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
