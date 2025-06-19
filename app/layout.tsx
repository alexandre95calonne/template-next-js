// Ce fichier permet de gérer le layout de la page principale

import { Providers } from "@/providers";
import { Header } from "./components/layout/Header";
import Script from "next/script";

import { getPageMetadata } from "@/utils/meta/metadata";
import { jsonLd } from "@/utils/meta/jsonLd";
import "@/styles/_index.scss";

import { Canonical } from "@/components/Canonical";
import { Footer } from "@/components/layout/Footer";

export const metadata = getPageMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <Canonical />
      </head>
      <body className="overflow-x-hidden">
        <div className="z-1 relative">
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
