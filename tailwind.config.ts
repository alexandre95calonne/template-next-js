// tailwind.config.ts est le fichier de configuration pour Tailwind CSS
// Vous définissez ici les styles globaux de votre application mais surtout les variants de taille d'écran
// Vous définissez aussi les couleurs principales de votre application
// Vous définissez les fonts de votre application
// Vous définissez les espacements de votre application
// Vous définissez les animations de votre application
// Vous définissez les thèmes de votre application

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "372px",
      ph: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FDFDFD",
        secondary: "#121212",
        tertiary: "#EFEFEF",
        black: "#000000",
        white: "#FFFFFF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        anton: ["Anton", "sans-serif"],
      },
      spacing: {
        24: "24px",
        36: "36px",
        48: "48px",
        60: "60px",
        72: "72px",
        84: "84px",
        96: "96px",
        108: "108px",
        120: "120px",
        132: "132px",
        144: "144px",
        156: "156px",
        168: "168px",
      },
      keyframes: {
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
        },
      },
      animation: {
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical":
          "scrolling-banner-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#fff",
              DEFAULT: "#6268F1",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: "#fff",
              DEFAULT: "#6268F1",
            },
          },
        },
      },
    }),
  ],
  darkMode: "class",
};
