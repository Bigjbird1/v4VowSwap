import React from "react";
import config from "../config";

// Define types for OpenGraph and SEO Tags
interface OpenGraph {
  title?: string;
  description?: string;
  url?: string;
}

interface SEOTags {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: OpenGraph;
  canonicalUrlRelative?: string;
  extraTags?: Record<string, unknown>;
}

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: SEOTags = {}) => {
  return {
    // up to 50 characters (what does your app do for the user?)
    title: title || config.appName,
    // up to 160 characters (how does your app help the user?)
    description: description || config.appDescription,
    // some keywords separated by commas. By default, it will be your app name
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    // set a base URL prefix for other fields that require a fully qualified URL
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `https://${config.domainName}/`
    ),
    openGraph: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      url: openGraph?.url || `https://${config.domainName}/`,
      siteName: openGraph?.title || config.appName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      card: "summary_large_image",
      creator: "@peterparker",
    },
    // If a canonical URL is given, we add it. The metadataBase will turn the relative URL into a fully qualified URL
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),
    // If you want to add extra tags, you can pass them here
    ...extraTags,
  };
};

// Render schema tags for structured data
export const RenderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Product",
          name: config.appName,
          description: config.appDescription,
          image: `https://${config.domainName}/icon.png`,
          url: `https://${config.domainName}/`,
          brand: {
            "@type": "Brand",
            name: config.appName,
          },
          offers: {
            "@type": "Offer",
            url: `https://${config.domainName}/`,
            priceCurrency: "USD",
            price: "9.00",
            availability: "http://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Speed Build Marketplace",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "12",
          },
        }),
      }}
    ></script>
  );
};
