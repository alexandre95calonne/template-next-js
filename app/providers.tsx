// Providers est un composant qui permet de fournir les providers pour le site
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}
