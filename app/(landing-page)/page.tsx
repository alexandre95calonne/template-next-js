"use client";

import { HeroSection } from "./components/HeroSection";
import { ContactSection } from "./components/ContactSection";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <ContactSection />
    </main>
  );
}
