"use client";

import { HeroSection } from "./sections/HeroSection";
import { ContactSection } from "./sections/ContactSection";
import { CTASection } from "./sections/CTASection";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <ContactSection />
      <CTASection />
    </main>
  );
}
