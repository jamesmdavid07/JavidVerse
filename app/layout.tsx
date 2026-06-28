import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Javid Verse — Creative Solutions for Ministry & Mission",
  description: "Purpose-driven design, video, publishing preparation, branding, and web solutions for ministries, authors, organizations, and individuals.",
  keywords: ["creative agency", "book services", "video services", "branding", "graphic design", "web creation", "marketing"],
  openGraph: {
    title: "Javid Verse — Creative Solutions for Ministry & Mission",
    description: "Creative media and digital solutions that help meaningful stories reach more people.",
    type: "website",
    url: "https://javid-verse.vercel.app",
    siteName: "JavidVerse",
    images: [
      {
        url: "https://javid-verse.vercel.app/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "JavidVerse creative agency"
      }
    ]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-light text-primary antialiased">
        <div className="min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
