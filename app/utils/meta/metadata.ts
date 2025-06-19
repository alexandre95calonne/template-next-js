// metadata.ts est le fichier de configuration pour le SEO de votre application

import { Metadata } from "next";

const title = "Template Next JS";
const description = "Template Next JS";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.template-next-js.com";

export function getPageMetadata(path: string = ""): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: ["template", "nextjs", "template nextjs"],
    authors: [
      {
        name: "Virtuosa",
        url: baseUrl,
      },
    ],
    creator: "Virtuosa - Agence Web Premium",
    publisher: "Virtuosa",
    icons: {
      icon: [
        {
          url: "/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
        {
          url: "/favicon.ico",
          sizes: "any",
        },
      ],
      shortcut: "/favicon-96x96.png",
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "Template Next JS",
      images: [
        {
          url: `${baseUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "Template Next JS",
        },
      ],
      locale: "fr_FR",
      alternateLocale: "fr_FR",
      type: "website",
      countryName: "France",
      emails: ["contact@template-next-js.com"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@virtuosa",
      site: "@virtuosa",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      nosnippet: false,
      notranslate: false,
      noimageindex: false,
      noarchive: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      languages: {
        "fr-FR": path ? `${baseUrl}/${path}` : baseUrl,
      },
    },
    manifest: "/site.webmanifest",
    other: {
      "geo.region": "FR",
      "geo.placename": "Paris",
      "geo.position": "48.8566;2.3522",
      ICBM: "48.8566, 2.3522",
      "place:location:latitude": "48.8566",
      "place:location:longitude": "2.3522",
      "business:contact_data:locality": "Paris",
      "business:contact_data:country_name": "France",
      "business:contact_data:email": "contact@virtuosa.fr",
      "business:contact_data:phone_number": "07 67 28 48 62",
      generator: "Next.js",
      "application-name": "Virtuosa",
      "apple-mobile-web-app-title": "Virtuosa",
    },
    verification: {
      other: {
        priority: "1.0",
        changefreq: "daily",
      },
    },
  };
}

export const metadata = getPageMetadata();
