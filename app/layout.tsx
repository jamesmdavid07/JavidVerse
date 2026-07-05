// Root Layout
import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Javid Verse — Creative Solutions for Ministry & Mission",
  description: "Purpose-driven design, video, publishing preparation, branding, and web solutions for ministries, authors, organizations, and individuals.",
  keywords: ["ministry creative studio", "book services", "video services", "branding", "graphic design", "website development", "digital ministry"],
  openGraph: {
    title: "Javid Verse — Creative Solutions for Ministry & Mission",
    description: "Creative media and digital solutions that help meaningful stories reach more people.",
    type: "website",
    url: "https://javid-verse.vercel.app",
    siteName: "JavidVerse",
    images: [
      {
        url: "https://javid-verse.vercel.app/site/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "JavidVerse creative solutions for ministry and mission"
      }
    ]
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
