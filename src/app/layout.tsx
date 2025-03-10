"use client";
import React, { useEffect } from "react";
import Context from "@/context/context";
import "@/styles/css/main.scss";
import "swiper/css/virtual";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "@/styles/custom.scss";

import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import Cart from "@/components/common/Cart";
import anime from "animejs";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/headers/component/MobileMenu";
import BacktoTop from "@/components/common/BacktoTop";
import { ParallaxProvider } from "react-scroll-parallax";
import ContactModal from "@/components/modals/ContactModal";
import NewsletterModal from "@/components/modals/NewsletterModal";
import SearchModal from "@/components/modals/SearchModal";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll("[data-anime]");

    // Intersection Observer callback function
    const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const dataAnime = element.getAttribute("data-anime") || "";

          const modifieddataAnime = dataAnime.replace(
            /anime\.stagger\((\d+),\s*\{start:\s*(\d+)\}\)/,
            "$1,$2"
          );

          if (modifieddataAnime) {
            const parseAnimeData = (data: string): Record<string, string> => {
              const settings: Record<string, string> = {};
              data.split(";").forEach((param) => {
                const [key, value] = param.split(":").map((item) => item.trim());
                if (key && value) {
                  settings[key] = value;
                }
              });
              return settings;
            };

            const animeSettings = parseAnimeData(modifieddataAnime);

            let targets: Element[] | HTMLCollection;
            if (animeSettings.targets === ">*") {
              targets = element.children;
            } else {
              // Convert NodeList to array
              targets = Array.from(element.querySelectorAll(animeSettings.targets));
            }

            // Apply Anime.js animation
            anime({
              loop: animeSettings.loop ? true : false,
              targets: targets,
              translateX: JSON.parse(animeSettings.translateX || "[0, 0]"),
              translateY: JSON.parse(animeSettings.translateY || "[48, 0]"),
              opacity: [0, 1],
              easing: animeSettings.easing || "spring(1, 80, 10, 0)",
              duration: Number(animeSettings.duration) || 450,
              delay: animeSettings.delay
                ? animeSettings.delay.includes(",")
                  ? anime.stagger(Number(animeSettings.delay.split(",")[0]), {
                      start: Number(animeSettings.delay.split(",")[1]),
                    })
                  : Number(animeSettings.delay)
                : 0,
            });

            // Unobserve the element after the animation triggers
            observer.unobserve(element);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [pathname]);

  return (
    <html lang="en" dir="ltr">
      <body>
        <Context>
          <ParallaxProvider>{children}</ParallaxProvider>
          <MobileMenu />
          <ContactModal />
          <NewsletterModal />
          <SearchModal />
          <Cart />
          <BacktoTop />
        </Context>
      </body>
    </html>
  );
}
