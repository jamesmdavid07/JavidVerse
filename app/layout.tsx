// Root layout — minimal shell shared by all route groups.
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "JavidVerse - For All Creative Solutions",
    template: "%s | JavidVerse",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-light text-primary antialiased">
        <div className="min-h-screen min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
