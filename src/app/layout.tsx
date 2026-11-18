import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LiquidCursor } from "@/components/liquid-cursor";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Frontend engineer building AI-powered product experiences. React, TypeScript, LLMs and MCP. Open to new roles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nileshkamble.co.in"),
  title: {
    default: "Nilesh Kamble · Frontend + AI Engineer",
    template: "%s · Nilesh Kamble",
  },
  description,
  authors: [{ name: "Nilesh Kamble", url: "https://nileshkamble.co.in" }],
  creator: "Nilesh Kamble",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nileshkamble.co.in",
    siteName: "Nilesh Kamble",
    title: "Nilesh Kamble · Frontend + AI Engineer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilesh Kamble · Frontend + AI Engineer",
    description,
    creator: "@devillus1972",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <LiquidCursor />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
