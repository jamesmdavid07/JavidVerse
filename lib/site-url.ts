const DEFAULT_SITE_URL = "https://javidverse.com";

export function getSiteUrl() {
  const rawSiteUrl = process.env.SITE_URL?.trim();

  if (!rawSiteUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const siteUrl = /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;
    return new URL(siteUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}
