// Site layout — wraps all public pages with Navbar, Footer, and analytics.
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsentBanner from "@/components/layout/ConsentBanner";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SQ27TCJ0H1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          var consent = 'denied';
          try {
            var m = document.cookie.match(/(?:^|;\\s*)jv_consent=([^;]+)/);
            if (m && (m[1] === 'granted' || m[1] === 'denied')) consent = m[1];
          } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: consent,
            ad_user_data: consent,
            ad_personalization: consent,
            analytics_storage: consent,
            wait_for_update: 500
          });
          gtag('config', 'G-SQ27TCJ0H1');
        `}
      </Script>

      <ConsentBanner />
      <WhatsAppButton />
    </>
  );
}
