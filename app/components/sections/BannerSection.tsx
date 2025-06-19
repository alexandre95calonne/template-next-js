interface BannerSectionProps {
  title: string;
}

export const BannerSection = ({ title }: BannerSectionProps) => {
  return (
    <div className="flex h-[35vh] w-full items-end justify-start overflow-x-hidden px-4 py-8 ph:px-24 ph:py-16 md:px-48 lg:px-72 xl:px-96">
      <h1 className="font-anton text-3xl leading-[48px] text-secondary ph:text-5xl ph:leading-[60px] md:leading-[72px] lg:text-5xl lg:leading-[84px]">
        {title}
      </h1>
    </div>
  );
};
