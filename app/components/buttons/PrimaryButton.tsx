import Link from "next/link";
import { Icon } from "@iconify/react";

export type PrimaryButtonProps = {
  text: string;
  navigateTo?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
  variant?: "secondary" | "WithIcon" | "TertiaryWithIcon";
};

export const PrimaryButton = ({
  text,
  navigateTo,
  className = "",
  target = "_self",
  onClick,
  variant,
}: PrimaryButtonProps) => {
  const baseClasses =
    "w-fit px-6 py-2 tracking-wide transition-all duration-300 text-sm rounded-xl uppercase relative overflow-hidden group";

  const colorClasses =
    variant === "secondary"
      ? "bg-secondary text-primary"
      : variant === "TertiaryWithIcon"
        ? "bg-tertiary text-primary"
        : "bg-secondary text-primary hover:bg-secondary/75";

  const buttonClasses = `${baseClasses} ${colorClasses} ${className}`;

  const textContent = (
    <div className="relative flex items-center gap-2">
      <div className="relative">
        {/* Texte principal */}
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-[150%]">
          {text}
        </span>
        {/* Texte de duplication pour l'animation */}
        <span className="absolute left-0 top-0 block translate-y-[150%] transition-transform duration-400 ease-out group-hover:translate-y-0">
          {text}
        </span>
      </div>
      {(variant === "WithIcon" || variant === "TertiaryWithIcon") && (
        <div className="relative">
          {/* Icône principale */}
          <Icon
            icon="lucide:arrow-right"
            className="block transition-transform duration-400 ease-out group-hover:-translate-y-[150%]"
            width={16}
            height={16}
          />
          {/* Icône de duplication pour l'animation */}
          <Icon
            icon="lucide:arrow-right"
            className="absolute left-0 top-0 block translate-y-[150%] transition-transform duration-400 ease-out group-hover:translate-y-0"
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );

  if (navigateTo) {
    return (
      <Link
        href={navigateTo}
        className={buttonClasses}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {textContent}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {textContent}
    </button>
  );
};
