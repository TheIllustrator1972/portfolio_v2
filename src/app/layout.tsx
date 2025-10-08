import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nilesh Portfolio",
  description: "Interactive portfolio of Nilesh Kamble",
  keywords: [
    "Nilesh",
    "Portfolio",
    "Developer",
    "Interactive",
    "Web Development",
    "Full Stack",
    "Next.js",
    "React",
    "iOS",
    "Swift",
    "JavaScript",
    "TypeScript",
    "Node.js",
  ],
  authors: [
    {
      name: "Nilesh",
      url: "https://nileshkamble.co.in",
    },
  ],
  creator: "Nilesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nileshkamble.co.in",
    title: "Nilesh Portfolio",
    description: "Developer Portfolio of Nilesh Kamble",
    siteName: "Nilesh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilesh Portfolio",
    description: "Developer Portfolio of Nilesh Kamble",
    creator: "@devillus1972",
  },
  icons: {
    icon: [
      {
        url: "/profilePic.jpg",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/profilePic.jpg" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
