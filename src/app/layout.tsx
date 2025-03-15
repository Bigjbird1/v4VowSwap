// filepath: /Users/raz/Documents/GitHub/speed-build-marketplace-ts/src/app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleTagManager } from "@next/third-parties/google";
import { getSEOTags } from "../../libs/seo";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
  params?: Record<string, any>;
}

export const metadata = getSEOTags();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div data-theme="light">{children}</div>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        </body>
      </html>
    </ClerkProvider>
  );
}
