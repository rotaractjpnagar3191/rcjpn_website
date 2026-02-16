import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // Keep standard Inter font
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rotaractjpnagar.org"),
  title: {
    default: "Rotaract Club of Bangalore JP Nagar",
    template: "%s | Rotaract JP Nagar",
  },
  description:
    "Official website of Rotaract Club of Bangalore JP Nagar, RI District 3191. Developing leadership through service and fellowship.",
  keywords: [
    "Rotaract Bangalore",
    "Rotaract JP Nagar",
    "Community Service",
    "Rotary District 3191",
    "Leadership",
    "Fellowship"
  ],
  authors: [{ name: "Rotaract Club of Bangalore JP Nagar" }],
  creator: "Rotaract Club of Bangalore JP Nagar",
  publisher: "Rotaract Club of Bangalore JP Nagar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rotaractjpnagar.org",
    siteName: "Rotaract Club of Bangalore JP Nagar",
    title: "Rotaract Club of Bangalore JP Nagar",
    description:
      "Join us in making a difference. Service, Fellowship, and Leadership in Bangalore.",
    images: [
      {
        url: "/images/hero/slide-1.webp",
        width: 1200,
        height: 630,
        alt: "Rotaract Club of Bangalore JP Nagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotaract Club of Bangalore JP Nagar",
    description:
      "Service, Fellowship, and Leadership in Bangalore.",
    images: ["/images/hero/slide-1.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://rotaractjpnagar.org",
  },
};

// Simplified JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rotaractjpnagar.org/#organization",
      name: "Rotaract Club of Bangalore JP Nagar",
      url: "https://rotaractjpnagar.org",
      logo: "https://rotaractjpnagar.org/images/logos/RaCJPN-Cranberry-UniteForGood-Regular.png",
      sameAs: [
        "https://www.instagram.com/rotaractjpnagar/",
        "https://www.facebook.com/rotaractjpnagar",
        "https://www.linkedin.com/company/rotaractjpnagar",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rotaractjpnagar.org/#website",
      url: "https://rotaractjpnagar.org",
      name: "Rotaract Club of Bangalore JP Nagar",
    },
  ],
};

import ScrollToTop from "@/components/ui/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
