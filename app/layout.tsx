// Root Layout
import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getMetadataBase } from "@/lib/site-url";

const siteUrl = getMetadataBase();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "JavidVerse - For All Creative Solutions",
    template: "%s | JavidVerse",
  },
  description: "Purpose-driven design, video, publishing preparation, branding, and web solutions for ministries, authors, organizations, and individuals.",
  keywords: ["ministry creative studio", "book services", "video services", "branding", "graphic design", "website development", "digital ministry"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JavidVerse - For All Creative Solutions",
    description: "Creative solutions for ministry, mission, authors, organizations, and individuals.",
    type: "website",
    url: "/",
    siteName: "JavidVerse",
    images: [
      {
        url: "/brand/javidverse-logo.png",
        width: 2189,
        height: 680,
        alt: "JavidVerse logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JavidVerse - For All Creative Solutions",
    description: "Creative solutions for ministry, mission, authors, organizations, and individuals.",
    images: ["/brand/javidverse-logo.png"],
  },
  icons: {
    icon: "/brand/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-light text-primary antialiased">
        <div className="min-h-screen">
          {/* Site-wide navigation */}
          <Navbar />

          {/* Main page content */}
          <main id="main-content">{children}</main>

          {/* Site-wide footer */}
          <Footer />
        </div>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQ27TCJ0H1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SQ27TCJ0H1');
          `}
        </Script>
      </body>
    </html>
  );
}
