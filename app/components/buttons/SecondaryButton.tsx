import Link from "next/link";

export type SecondaryButtonProps = {
  text: string;
  navigateTo?: string;
  target?: string;
  className?: string;
  onClick?: () => void;
};

export const SecondaryButton = ({
  text,
  navigateTo,
  target = "_self",
  className = "",
  onClick,
}: SecondaryButtonProps) => {
  const baseClasses =
    "w-fit px-6 py-2 tracking-wide transition-all duration-300 text-sm rounded-xl uppercase border border-primary text-primary bg-transparent hover:text-secondary hover:bg-primary";

  const buttonClasses = `${baseClasses} ${className}`;

  if (navigateTo) {
    return (
      <Link
        href={navigateTo}
        className={buttonClasses}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {text}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};
