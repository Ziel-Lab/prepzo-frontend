"use client";
import React, { useEffect, useRef, useState } from "react";
import { accordionItems } from "@/data/faq";

interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  faqData?: FaqItem[];
  parentClass?: string;
}

export default function Accordion({
  faqData = accordionItems,
  parentClass = "",
}: AccordionProps) {
  const parentRefs = useRef<(HTMLLIElement | null)[]>([]);
  const questionRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    questionRefs.current.forEach((el) => el?.classList.remove("active"));
    parentRefs.current.forEach((el) => el?.classList.remove("active"));
    answerRefs.current.forEach((el) => {
      if (el) {
        el.style.height = "0px";
        el.style.overflow = "hidden";
        el.style.transition = "all 0.5s ease-in-out";
        el.style.marginTop = "0px";
      }
    });

    if (currentIndex !== -1) {
      questionRefs.current[currentIndex]?.classList.add("active");
      parentRefs.current[currentIndex]?.classList.add("active");
      const element = answerRefs.current[currentIndex];
      if (element) {
        element.style.height = `${element.scrollHeight}px`;
        element.style.overflow = "hidden";
        element.style.transition = "all 0.5s ease-in-out";
        element.style.marginTop = "20px";
      }
    }
  }, [currentIndex]);

  return React.createElement(
    React.Fragment,
    null,
    faqData.map((item, index) =>
      React.createElement(
        "li",
        {
          key: index,
          ref: (el: HTMLLIElement | null) => (parentRefs.current[index] = el),
          className: `panel ${currentIndex === index ? "uc-open" : ""} ${parentClass}`,
          onClick: () =>
            setCurrentIndex((prev) => (prev === index ? -1 : index)),
        },
        React.createElement(
          "a",
          {
            ref: (el: HTMLAnchorElement | null) =>
              (questionRefs.current[index] = el),
            className: "uc-accordion-title h6 md:h5",
          },
          item.question
        ),
        React.createElement(
          "div",
          {
            ref: (el: HTMLDivElement | null) =>
              (answerRefs.current[index] = el),
            className: "uc-accordion-content lg:fs-4 opacity-70",
          },
          React.createElement("p", null, item.answer)
        )
      )
    )
  );
}
