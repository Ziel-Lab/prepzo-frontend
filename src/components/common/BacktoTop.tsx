"use client";
import { useContextElement } from "@/context/context";
import React, { useEffect, useState } from "react";

export default function BacktoTop() {
  const { isDark, handleToggle } = useContextElement();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`backtotop-wrap position-fixed bottom-0 end-0 z-99 m-2 vstack ${
        isVisible ? "uc-active" : ""
      }`}
    >
      <div
        className="darkmode-trigger cstack w-40px h-40px rounded-circle text-none bg-gray-100 dark:bg-gray-700 dark:text-white"
        data-darkmode-toggle=""
      >
        <label className="switch">
          <span className="sr-only">Dark mode toggle</span>
          <input onChange={handleToggle} type="checkbox" checked={isDark} />
          <span className="slider fs-5"></span>
        </label>
      </div>
      <a
        className="btn btn-sm bg-primary text-white w-40px h-40px rounded-circle"
        onClick={scrollToTop}
        data-uc-backtotop
      >
        <i className="icon-2 unicon-chevron-up"></i>
      </a>
    </div>
  );
}
