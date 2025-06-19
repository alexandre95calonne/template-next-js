"use client";

import heroImage from "@/assets/images/hero.png";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import Image from "next/image";

export function HeroSection() {
  return (
    <main
      id="hero-section"
      className="relative flex w-full flex-col items-center justify-end gap-6 overflow-x-hidden px-4 py-12 ph:gap-8 ph:px-24 md:px-48 md:py-28 lg:px-72 xl:px-96"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Image de fond avec le composant Image de Next.js */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </main>
  );
}
