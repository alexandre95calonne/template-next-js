export interface CookieArticle {
  title: string;
  content: {
    mainText?: string;
    bulletPoints?: string[];
    additionalText?: string[];
    contactInfo?: string;
  }[];
}

export const cookiesData: CookieArticle[] = [
  {
    title: "Notre Politique de Cookies",
    content: [
      {
        mainText:
          "Le site artisan-clotures-portails.com utilise uniquement des cookies essentiels pour garantir son bon fonctionnement. Nous respectons votre vie privée et n'utilisons aucun cookie publicitaire ou de traçage.",
      },
    ],
  },
  {
    title: "Cookies Essentiels",
    content: [
      {
        mainText: "Nous utilisons uniquement des cookies techniques pour :",
      },
      {
        bulletPoints: [
          "Maintenir votre session sécurisée",
          "Mémoriser vos préférences de navigation",
          "Assurer le bon fonctionnement du site",
        ],
      },
    ],
  },
  {
    title: "Aucun Tracking",
    content: [
      {
        mainText: "Nous nous engageons à :",
      },
      {
        bulletPoints: [
          "Ne pas utiliser de cookies publicitaires",
          "Ne pas partager vos données avec des tiers",
          "Ne pas intégrer de services de tracking externes",
          "Ne pas revendre vos informations",
        ],
      },
    ],
  },
  {
    title: "Vos Droits",
    content: [
      {
        mainText: "En tant qu'utilisateur, vous pouvez à tout moment :",
      },
      {
        bulletPoints: [
          "Configurer votre navigateur pour refuser les cookies (cela peut affecter certaines fonctionnalités)",
          "Supprimer les cookies existants via les paramètres de votre navigateur",
          "Naviguer en mode privé pour limiter le stockage des cookies",
        ],
      },
    ],
  },
  {
    title: "Questions ?",
    content: [
      {
        mainText:
          "Pour toute question concernant notre utilisation des cookies, contactez-nous à :",
      },
      {
        contactInfo: "agence@virtuosa.fr",
      },
    ],
  },
];
