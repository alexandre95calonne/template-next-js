import Link from "next/link";

export type PrimaryButtonProps = {
  text: string;
  navigateTo?: string;
  className?: string;
  target?: string;
  onClick?: () => void;
};

export const PrimaryButton = ({
  text,
  navigateTo,
  className = "",
  target = "_self",
  onClick,
}: PrimaryButtonProps) => {
  const buttonClasses = `px-6 py-3 bg-secondary text-primary rounded-lg 
    transition-all duration-300 ease-out
    hover:bg-secondary/90 
    hover:scale-[1.02] 
    hover:shadow-lg 
    hover:shadow-secondary/20
    active:scale-[0.98]
    active:shadow-md
    focus:outline-none 
    focus:ring-2 
    focus:ring-secondary/30 
    focus:ring-offset-2 
    focus:ring-offset-white
    ${className}`;

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
