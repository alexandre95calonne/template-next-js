import { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionLayoutProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
};

export const SectionLayout = ({
  children,
  id,
  className,
  noPaddingX = false,
  noPaddingY = false,
}: SectionLayoutProps) => {
  return (
    <section
      id={id}
      className={cn(
        "flex w-full flex-col items-center justify-center",
        !noPaddingX && "px-4 ph:px-24 md:px-48 lg:px-72 xl:px-96",
        !noPaddingY && "py-12",
        className
      )}
    >
      {children}
    </section>
  );
};
