import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleTagManager } from "@next/third-parties/google";
import { getSEOTags } from "../../libs/seo";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
  params?: Record<string, any>;
}

// This adds default SEO tags to all pages in our app.
// You can then override them in each page by passing params to the getSEOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </html>
    </ClerkProvider>
  );
}
