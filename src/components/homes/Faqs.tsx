"use client";
import React, { useState } from "react";
import Accordion from "@/components/common/Accordion";
import Image from "next/image";
import Link from "next/link";
import { accordionItems } from "@/data/faq"; // adjust the path as needed

interface FaqsProps {
  ctaParentClass?: string;
}

const Faqs: React.FC<FaqsProps> = ({
  ctaParentClass = "section-outer panel",
}) => {
  // Start by showing 4 questions
  const [visibleQuestions, setVisibleQuestions] = useState<number>(4);

  const handleToggle = () => {
    if (visibleQuestions < accordionItems.length) {
      // Show all questions
      setVisibleQuestions(accordionItems.length);
    } else {
      // Collapse back to 4 questions
      setVisibleQuestions(4);
    }
  };

  const displayedItems = accordionItems.slice(0, visibleQuestions);

  return (
    <div id="faq" className="faq section panel">
      <div className={ctaParentClass}>
        <div className="container lg:max-w-lg">
          <div
            className="section-inner panel"
            data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
          >
            <div className="row child-cols-12 col-match g-4">
              <div>
                <div className="vstack items-center text-center gap-2">
                  <h2 className="h4 sm:h3 xl:h2 m-0">
                    Frequently asked questions!
                  </h2>
                </div>
              </div>
              <div>
                <div className="panel rounded-2 p-3 lg:p-8 border">
                  <ul
                    className="uc-accordion-divider gap-7 max-w-md mx-auto uc-accordion"
                    data-uc-accordion="targets: > li; multiple: true;"
                    style={{ "--divider-gap": "56px" } as React.CSSProperties}
                  >
                    {/* Pass FAQ data via the faqData prop */}
                    <Accordion faqData={displayedItems} />
                  </ul>
                  {accordionItems.length > 4 && (
                    <button
                      onClick={handleToggle}
                      className="btn btn-sm mt-4 block mx-auto"
                    >
                      {visibleQuestions < accordionItems.length ? "[more]" : "[less]"}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div className="panel vstack items-center justify-between gap-2 text-center rounded-2 p-3 lg:py-8 bg-primary text-white uc-dark">
                  <div className="panel">
                    <div className="vstack items-center gap-2">
                      <h2 className="h6 lg:h5 m-0">What if I need human advice?</h2>
                      <p className="lg:fs-5 text-dark dark:text-white text-opacity-70">
                        Premium users get dedicated human support anytime. <br />
                        Still curious?
                      </p>
                      <div className="hstack justify-center gap-0">
                        <Image
                          alt="Avatar-image"
                          className="w-48px h-48px rounded-circle border border-2 border-white dark:border-primary"
                          src="/assets/images/avatars/02.jpg"
                          width={96}
                          height={96}
                        />
                        <Image
                          alt="Avatar-image"
                          className="w-48px h-48px rounded-circle border border-2 border-white dark:border-primary ms-n2"
                          src="/assets/images/avatars/01.jpg"
                          width={96}
                          height={96}
                        />
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/page-contact`}
                    className="btn btn-md btn-primary text-tertiary dark:bg-tertiary dark:text-primary fw-bold rounded-pill px-3 lg:px-5 mt-1 lg:mt-2"
                  >
                    [Talk to a human →]
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
