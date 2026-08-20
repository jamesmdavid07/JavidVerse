const redirects = [
  // Preserve the link shared before the devotional title was clarified.
  { source: "/devotionals/saul-s-first-battle-success", destination: "/devotionals/king-saul-s-first-battle-success", permanent: true },
  { source: "/about", destination: "/about-us", permanent: true },
  { source: "/book", destination: "/book-services", permanent: true },
  { source: "/books", destination: "/book-services", permanent: true },
  { source: "/web", destination: "/website-services", permanent: true },
  { source: "/web-creation-marketing", destination: "/website-services", permanent: true },
  { source: "/graphic", destination: "/graphic-design", permanent: true },
  { source: "/graphic-design-branding", destination: "/graphic-design", permanent: true },
  { source: "/video", destination: "/videography", permanent: true },
  { source: "/video-services", destination: "/videography", permanent: true },
];

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  // Preserve previously published service URLs while using descriptive canonical routes.
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
