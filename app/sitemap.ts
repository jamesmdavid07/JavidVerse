import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL ?? "https://javidverse.com";

const routes = [
  "",
  "/about-us",
  "/book-services",
  "/website-services",
  "/graphic-design",
  "/videography",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
