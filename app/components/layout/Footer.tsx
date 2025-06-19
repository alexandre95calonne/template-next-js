"use client";

import logo from "@/assets/images/logos/logo.svg";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-12  px-4 pb-12 pt-[6rem] ph:px-24 md:px-48 lg:px-72 xl:px-96">
      <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <Image src={logo} alt="Logo" width={130} height={130} />
        </div>
        <div className="flex gap-4">
          <Link
            href="/cookies"
            className="text-sm text-secondary hover:text-secondary/75"
          >
            Gestion des cookies
          </Link>

          <Link
            href="/mentions-legales"
            className="text-sm text-secondary hover:text-secondary/75"
          >
            Mentions légales
          </Link>
        </div>
      </div>

      <div className="h-px w-full bg-secondary/25"></div>

      <div className="text-center">
        <p className="text-sm text-secondary">
          © {currentYear} <span className="font-bold">XX</span>. Tous droits
          réservés. Site web développé par{" "}
          <Link
            href="https://www.virtuosa.fr/"
            className="font-bold hover:text-secondary/75"
            target="_blank"
          >
            Virtuosa
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
