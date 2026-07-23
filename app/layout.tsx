// Root Layout
import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const siteUrl = new URL(process.env.SITE_URL ?? "https://javidverse.com");

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
        width: 2048,
        height: 640,
        alt: "JavidVerse logo"
      }
    ]
  },
  twitter: {
    card: "summary",
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
      </body>
    </html>
  );
}
