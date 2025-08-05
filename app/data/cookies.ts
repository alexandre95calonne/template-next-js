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
    title: "Our Cookie Policy",
    content: [
      {
        mainText:
          "This Next.js template uses only essential cookies to ensure its proper functioning. We respect your privacy and do not use any advertising or tracking cookies.",
      },
    ],
  },
  {
    title: "Essential Cookies",
    content: [
      {
        mainText: "We only use technical cookies for:",
      },
      {
        bulletPoints: [
          "Maintaining your secure session",
          "Remembering your navigation preferences",
          "Ensuring the proper functioning of the site",
        ],
      },
    ],
  },
  {
    title: "No Tracking",
    content: [
      {
        mainText: "We are committed to:",
      },
      {
        bulletPoints: [
          "Not using advertising cookies",
          "Not sharing your data with third parties",
          "Not integrating external tracking services",
          "Not reselling your information",
        ],
      },
    ],
  },
  {
    title: "Your Rights",
    content: [
      {
        mainText: "As a user, you can at any time:",
      },
      {
        bulletPoints: [
          "Configure your browser to refuse cookies (this may affect some features)",
          "Delete existing cookies through your browser settings",
          "Browse in private mode to limit cookie storage",
        ],
      },
    ],
  },
  {
    title: "Questions?",
    content: [
      {
        mainText:
          "For any questions regarding our use of cookies, contact us at:",
      },
      {
        contactInfo: "contact@example.com",
      },
    ],
  },
];
