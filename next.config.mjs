/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforces a trailing slash at the end of URLs. This can help with consistency in URL structures.
  trailingSlash: true,

  // Configuration for handling images from external domains
  images: {
    // Specifies domains that are allowed to host images to be used in the Next.js application
    domains: ["res.cloudinary.com"], // Example domain; replace with your own or remove if not needed
  },
};

export default nextConfig;

/*
  Documentation:

  - trailingSlash: This option ensures that URLs end with a slash (e.g., /about/ instead of /about).
    This can be useful for SEO and maintaining consistent URL structures.

  - images.domains: This option specifies the allowed external domains for images. It's necessary
    if you want to use images from a domain that is not the same as your Next.js application. 
    You can add more domains to the array or remove this setting if not needed.

  - redirects: The redirects function allows you to specify redirect rules. This example is commented
    out to simplify the boilerplate. You can uncomment and modify it to add your own redirect logic.
    Each redirect rule must have a source (pattern to match), destination (where to redirect to),
    and a permanent flag (true for 301 redirects, false for 302).

  For more information, visit the Next.js documentation: https://nextjs.org/docs
*/
