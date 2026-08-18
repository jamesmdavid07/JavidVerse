import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getPublishedDevotionals } from "@/lib/devotionals";

const siteUrl = getSiteUrl();

const routes = [
  "",
  "/about-us",
  "/book-services",
  "/website-services",
  "/graphic-design",
  "/videography",
  "/devotionals",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  let devotionalRoutes: MetadataRoute.Sitemap = [];
  try {
    const published = await getPublishedDevotionals();
    devotionalRoutes = published.map((d) => ({
      url: `${siteUrl}/devotionals/${d.slug}`,
      lastModified: new Date(d.publicationDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable at build time — skip devotional URLs in sitemap.
  }

  return [...staticRoutes, ...devotionalRoutes];
}
