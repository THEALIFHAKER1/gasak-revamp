import type { Metadata } from "next";
import "@styles/globals.css";
import { ThemeProvider } from "@providers/theme-provider";
import { BrandProvider } from "@/components/providers/brand-provider";
import NextAuthProvider from "@/components/providers/session-provider";
import SplashWrapper from "@/components/layouts/splash/splash-wrapper";
import { DynamicFavicon } from "@/components/brand/dynamic-favicon";
import { generateBrandMetadata } from "@/lib/brand-metadata";

export const metadata: Metadata = generateBrandMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">
          <BrandProvider>
            <NextAuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <DynamicFavicon />
                <SplashWrapper>{children}</SplashWrapper>
              </ThemeProvider>
            </NextAuthProvider>
          </BrandProvider>
        </body>
      </html>
    </>
  );
}
