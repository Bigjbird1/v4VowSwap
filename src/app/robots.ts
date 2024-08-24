interface RobotsRules {
  userAgent: string;
  allow?: string;
  disallow?: string;
}

interface RobotsConfig {
  rules: RobotsRules | RobotsRules[];
  sitemap: string;
}

export default function robots(): RobotsConfig {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
