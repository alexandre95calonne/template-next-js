"use client";

import { useState } from "react";
import { BannerSection } from "@/components/sections/BannerSection";
import { legalData } from "@/data/legal-notice";
import { Icon } from "@iconify/react";
import { BreadcrumbHomepage } from "@/components/sections/BreadcrumbHomepage";

export default function MentionsLegales() {
  const [openArticles, setOpenArticles] = useState<number[]>(
    Array.from({ length: legalData.length }, (_, index) => index)
  );

  const toggleArticle = (index: number) => {
    setOpenArticles((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderContent = (content: (typeof legalData)[0]["content"]) => {
    return (
      <div className="flex flex-col gap-4 xl:gap-8">
        {content.map((section, idx) => (
          <div key={idx}>
            {section.mainText && <p>{section.mainText}</p>}

            {section.bulletPoints && (
              <ul className="flex flex-col gap-2">
                {section.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.additionalText?.map((text, i) => <p key={i}>{text}</p>)}

            {section.contactInfo && (
              <p className="font-bold">{section.contactInfo}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section>
      <BannerSection title="Mentions légales" />
      <BreadcrumbHomepage className="text-black" />
      <div className="w-full px-4 py-20 ph:px-24 md:px-48 lg:px-72 xl:px-96">
        <div className="space-y-4 text-black">
          {legalData.map((article, index) => (
            <div key={index} className="border-b border-b-black">
              <button
                onClick={() => toggleArticle(index)}
                className="flex w-full items-center justify-between text-left"
              >
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <Icon
                  icon="mdi:chevron-down"
                  className={`transform transition-transform duration-200 ${
                    !openArticles.includes(index) ? "rotate-90" : ""
                  }`}
                  width={40}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openArticles.includes(index) ? "mb-6" : "max-h-0"
                }`}
              >
                {renderContent(article.content)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
