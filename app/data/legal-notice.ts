export interface LegalArticle {
  title: string;
  content: {
    mainText?: string;
    bulletPoints?: string[];
    additionalText?: string[];
    contactInfo?: string;
  }[];
}

export const legalData: LegalArticle[] = [
  {
    title: "Mentions Légales",
    content: [
      {
        mainText:
          "Le présent template Next.js est édité et géré par Virtuosa pour le compte de Template Next.js :",
      },
      {
        bulletPoints: [
          "Propriétaire et éditeur du template : Virtuosa",
          "Contact éditeur : agence@virtuosa.fr",
          "Projet représenté : Template Next.js",
          "Statut juridique : Template open source sous licence MIT",
          "Secteur d'intervention : Développement web et applications",
          "Contact : agence@virtuosa.fr",
          "Responsable de publication : Virtuosa",
        ],
      },
      {
        additionalText: [
          "Template Next.js est un projet de template moderne et optimisé pour le développement d'applications web avec Next.js, React et TypeScript.",
          "Le template est fourni gratuitement et peut être utilisé pour des projets personnels et commerciaux selon les termes de la licence MIT.",
          "Pour toute problématique technique ou erreur constatée sur le template, contactez Virtuosa : agence@virtuosa.fr",
          "Pour toute information concernant le développement web et les templates : agence@virtuosa.fr",
        ],
      },
    ],
  },
  {
    title: "Protection des Données (RGPD)",
    content: [
      {
        mainText:
          "Le template peut inclure des formulaires de contact qui collectent les informations suivantes : nom, email et message. Ces données sont collectées et traitées par Virtuosa uniquement pour :",
      },
      {
        bulletPoints: [
          "Transmettre vos demandes de support et de contact via email",
          "Aucune donnée n'est stockée en base de données par défaut",
          "Les informations sont utilisées uniquement pour l'envoi du message et sont ensuite supprimées",
          "Aucun traitement ultérieur n'est effectué sur ces données",
        ],
      },
      {
        additionalText: [
          "Les formulaires inclus dans le template utilisent des systèmes de protection contre les spams qui n'affectent pas votre vie privée.",
          "Conformément au RGPD et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants :",
          "Droit d'accès, de rectification et de suppression de vos données",
          "Droit d'opposition ou de limitation au traitement",
          "Droit à la portabilité de vos données",
        ],
      },
      {
        contactInfo: "Pour exercer vos droits : agence@virtuosa.fr",
      },
      {
        mainText:
          "Cookies : Le template peut utiliser des cookies pour améliorer votre expérience. Vous pouvez les désactiver via les paramètres de votre navigateur.",
      },
    ],
  },
  {
    title: "Propriété Intellectuelle",
    content: [
      {
        mainText:
          "La structure du template, les composants, les styles et tout autre contenu sont la propriété exclusive de Virtuosa, sauf mention contraire.",
      },
      {
        bulletPoints: [
          "Toute reproduction (totale ou partielle) est interdite sans autorisation écrite de Virtuosa.",
          "Les marques et logos figurant sur ce template sont protégés et leur réutilisation non autorisée est passible de poursuites.",
        ],
      },
    ],
  },
  {
    title: "Conditions Générales d'Utilisation (CGU)",
    content: [
      {
        mainText:
          "En utilisant le template Next.js de Virtuosa, vous acceptez de :",
      },
      {
        bulletPoints: [
          "Respecter les lois en vigueur et les droits de propriété intellectuelle",
          "Utiliser le template uniquement pour des finalités légitimes (développement d'applications)",
          "Ne pas perturber le bon fonctionnement du template (virus, piratage, etc.)",
        ],
      },
      {
        additionalText: [
          "Responsabilités : Virtuosa s'efforce d'assurer l'exactitude des informations techniques affichées. Toutefois, nous ne pouvons être tenus responsables en cas d'erreur ou de dysfonctionnement.",
        ],
      },
    ],
  },
  {
    title: "Acceptation",
    content: [
      {
        mainText:
          "En utilisant le template Next.js de Virtuosa, vous déclarez avoir lu et accepté l'ensemble de ces mentions légales et CGU.",
      },
    ],
  },
];
