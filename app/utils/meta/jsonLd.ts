// app/meta/jsonLd.ts est le fichier de configuration pour le JSON-LD de votre application

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Template Next JS",
  alternateName: "Template Next JS",
  url: "https://www.template-next-js.com",
  logo: "https://www.template-next-js.com/images/logo.png",
  image: "https://www.template-next-js.com/api/og",
  description:
    "Le haut de gamme digital n'a jamais été aussi accessible. Site web, image de marque, notoriété : on construit tout, sur-mesure.",
  areaServed: {
    "@type": "Country",
    name: "France",
    "@id": "https://www.wikidata.org/wiki/Q142",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "10",
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Création de site web",
      description:
        "Sites web sur-mesure, design premium et développement optimisé",
    },
    {
      "@type": "Offer",
      name: "Image de marque",
      description: "Identité visuelle complète et stratégie de marque",
    },
    {
      "@type": "Offer",
      name: "Notoriété digitale",
      description:
        "Stratégie de visibilité et développement de la présence en ligne",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "07 67 28 48 62",
    contactType: "customer service",
    email: "contact@virtuosa.fr",
    availableLanguage: ["French", "English"],
  },
  potentialAction: {
    "@type": "ContactAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.virtuosa.fr/contact",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "ContactPoint",
      name: "Demande de contact",
    },
  },
  sameAs: [
    "https://www.linkedin.com/company/virtuosa",
    "https://twitter.com/virtuosa",
    "https://www.instagram.com/virtuosa",
  ],
};
