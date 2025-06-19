// use-scroll-restoration.ts est le fichier de configuration pour la restauration du scroll de votre application

"use client";
import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem("scrollPosition");
      }
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return null;
}
