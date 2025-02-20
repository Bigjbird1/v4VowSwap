interface CrispConfig {
  id: string;
  onlyShowOnRoutes?: string[];
}

interface SendGridConfig {
  subdomain?: string;
  fromNoReply: string;
  fromAdmin: string;
  supportEmail?: string;
  forwardRepliesTo?: string;
}

interface Config {
  appName: string;
  appDescription: string;
  domainName: string;
  sendGrid: SendGridConfig;
  databaseType: "mongodb" | "supabase";
}

const config: Config = {
  // REQUIRED
  appName: "Speed build Marketplace",

  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Speed build Marketplace is everything you need to quickly build your marketplace MVP.",

  // REQUIRED (no https://, no trailing slash at the end, just the naked domain)
  domainName: "speedbuildmarketplace.com",

  sendGrid: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it.
    subdomain: "mail",

    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Peter <peter@gmail.com>`,

    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates, etc.
    fromAdmin: `Peter Parker <peter@gmail.com>`,

    // Email shown to customers if they need support. Leave empty if not needed
    supportEmail: "peter@gmail.com",

    // When someone replies to supportEmail sent by the app, forward it to this email. If supportEmail is empty, this will be ignored.
    forwardRepliesTo: "peter.parker@gmail.com",
  },
  // NEW: Add database type configuration
  databaseType:
    (process.env.DATABASE_TYPE as "mongodb" | "supabase") || "mongodb",
};

export default config;
