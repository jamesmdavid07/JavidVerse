// Reusable Service Card
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Film, LayoutGrid, Globe } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

// Maps service data to the icon displayed in each card.
const iconMap = {
  BookOpen,
  Film,
  LayoutGrid,
  Globe
};

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: keyof typeof iconMap;
  image?: string;
}

// Reusable service card with an image or labeled media fallback.
export default function ServiceCard({ title, description, href, icon, image }: ServiceCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.article whileHover={{ y: -6 }} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-light shadow-premium transition-all duration-300">
      {/* Service image or clearly labeled fallback */}
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          <Image
            src={image}
            alt={`${title} service`}
            fill
            className="object-cover object-center transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : (
        <MediaPlaceholder label="Service image placeholder" icon={<Icon className="h-9 w-9" />} className="aspect-[16/10] rounded-none" />
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="mt-4 flex-1 text-sm leading-6 text-primary/70">{description}</p>
        <Link href={href} className="mt-6 inline-flex items-center text-sm font-semibold text-accent transition group-hover:translate-x-1">
          View details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.article>
  );
}
