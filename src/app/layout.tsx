// filepath: /Users/raz/Documents/GitHub/speed-build-marketplace-ts/src/app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleTagManager } from "@next/third-parties/google";
import { getSEOTags } from "../../libs/seo";
import React from "react";
import { Cormorant_Garamond, Lato } from "next/font/google";

interface RootLayoutProps {
  children: React.ReactNode;
  params?: Record<string, any>;
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = getSEOTags();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${lato.variable} ${cormorant.variable} font-sans`}>
          <div data-theme="light">{children}</div>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        </body>
      </html>
    </ClerkProvider>
  );
}
