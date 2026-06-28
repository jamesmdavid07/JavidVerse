import Link from "next/link";
import { Mail } from "lucide-react";

const links = [
  ["Home", "/"], ["About", "/about"], ["Book", "/book"], ["Graphic", "/graphic"],
  ["Video", "/video"], ["Web", "/web"], ["Contact", "/contact"]
];
const external = [
  ["James M. David", "https://jamesmdavid.vercel.app/"],
  ["Ministry Story", "https://sites.google.com/view/jamesbyfaith/home"],
  ["YouTube", "https://www.youtube.com/@javid07./videos"],
  ["Jay Travels", "https://www.youtube.com/@jaytravels4113"]
];

export default function Footer() {
  return (
    <footer className="bg-primary py-12 border-t-2 border-accent/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.7fr_0.8fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">JavidVerse</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-light/75">Helping ministries, churches, organizations, authors, and individuals communicate with purpose through design, video, books, branding, and websites.</p>
          </div>
          <div><p className="font-semibold text-accent">Explore</p><div className="mt-4 grid grid-cols-2 gap-3">{links.map(([label, href]) => <Link key={href} href={href} className="text-sm text-light/75 hover:text-accent">{label}</Link>)}</div></div>
          <div><p className="font-semibold text-accent">Connect</p><div className="mt-4 space-y-3">{external.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="block text-sm text-light/75 hover:text-accent">{label}</a>)}</div></div>
          <div className="flex items-center gap-3 md:col-span-3">
            <Mail className="h-5 w-5 text-accent" /><Link href="mailto:hello@javidverse.com" className="text-sm font-semibold text-light hover:text-accent">hello@javidverse.com</Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-accent/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-light/60">© 2026 Javid Verse. Founded by James M. David. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
