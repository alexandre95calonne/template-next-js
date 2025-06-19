"use client";

import { BannerSection } from "./components/sections/BannerSection";
import { PrimaryButton } from "./components/buttons/PrimaryButton";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <main className="">
      <BannerSection title="Page non trouvée" />
      <section className="flex flex-col items-center gap-4 px-4 py-20 text-black ph:px-24 md:px-48 lg:px-72 xl:px-96">
        <Icon icon="mdi:emoticon-sad" className="h-10 w-10" />

        <p className="text-center text-xl font-medium">
          Erreur 404 : La page que vous recherchez n&apos;existe pas.
        </p>
        <div className="mt-8 flex flex-row gap-4">
          <PrimaryButton text="Retourner à l'accueil" navigateTo="/" />
          <PrimaryButton text="Nous contacter" navigateTo="/#contact" />
        </div>
      </section>
    </main>
  );
}
