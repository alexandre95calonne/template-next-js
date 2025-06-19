"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";

export const BreadcrumbHomepage = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "flex w-full flex-row justify-start px-4 pt-8 ph:px-24 md:px-48 lg:px-72 xl:px-96",
        className
      )}
    >
      <div>
        <Link href="/" className="group font-light text-black">
          <div className="flex items-center gap-1">
            <Icon icon="mdi:chevron-left" className="h-5 w-5 text-black" />
            <span className="duration-300">Retour à l&apos;accueil</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
