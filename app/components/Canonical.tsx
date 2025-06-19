"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://github.com/votre-repo";

export function Canonical() {
  const pathname = usePathname();

  useEffect(() => {
    // Supprimer l'ancien canonical s'il existe
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Créer et ajouter le nouveau canonical
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = `${BASE_URL}${pathname}`;
    document.head.appendChild(link);

    // Cleanup lors du démontage du composant
    return () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.remove();
      }
    };
  }, [pathname]); // Se déclenche à chaque changement de pathname

  return null; // Le composant ne rend rien visuellement
}
