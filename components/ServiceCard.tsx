"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Film, LayoutGrid, Globe } from "lucide-react";

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

export default function ServiceCard({ title, description, href, icon, image }: ServiceCardProps) {
  const Icon = iconMap[icon];
  
  return (
    <motion.article whileHover={{ y: -6 }} className="group overflow-hidden rounded-[2rem] border border-primary/15 bg-light shadow-premium transition-all duration-300">
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
          <Image src={image} alt={`${title} service`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-primary to-blue-800 p-6 text-center">
          {/* TODO: Replace this service placeholder with a real portfolio image. */}
          <div><Icon className="mx-auto h-9 w-9 text-accent" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-light/80">Service image placeholder</p></div>
        </div>
      )}
      <div className="p-7">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-accent">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-primary/70">{description}</p>
      <Link href={href} className="mt-6 inline-flex items-center text-sm font-semibold text-accent transition group-hover:translate-x-1">
        View details
      </Link>
      </div>
    </motion.article>
  );
}
