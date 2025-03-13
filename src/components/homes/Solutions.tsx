"use client";
import React, { useState} from "react";
import { features9 } from "@/data/features";
import Image from "next/image";
import LiveKitModal from "@/components/modals/LiveKitModal";

interface Feature {
  order: string;
  icon: string;
  title: string;
}

const Solutions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      id="key_features"
      className="key-features section panel overflow-hidden uc-dark lg:px-6"
    >
      <div
        className="section-outer panel py-4 md:py-6 xl:py-10 bg-secondary dark:bg-primary-700 dark:text-white dark:text-opacity-60 rounded-2 lg:rounded-4"
        data-anime="onscroll: .key-features; onscroll-trigger: 1; onscoll-duration: 150%; translateY: [-80, 0]; scale: [0.85, 1]; opacity: [0.85, 1]; easing: linear;"
      >
        <Image
          className="d-none lg:d-inline-block w-200px position-absolute"
          alt="man-trigger"
          style={{ bottom: "-5%", left: "20%" }}
          data-anime="onview: -200; scale: [0.8, 1]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: 500;"
          src="/assets/images/vectors/man-trigger.svg"
          width={136}
          height={171}
        />
        <Image
          className="d-none lg:d-inline-block w-32px position-absolute text-white"
          alt="appostrof"
          style={{ bottom: "16%", right: "33%", transform: "rotate(45deg)" }}
          data-uc-svg=""
          data-anime="onview: -200; scale: [0.8, 1]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: 500;"
          src="/assets/images/vectors/appostrof.svg"
          width={29}
          height={34}
        />
        <div className="container sm:max-w-lg">
          <div className="section-inner panel">
            <div
              className="panel vstack items-center gap-2 xl:gap-3 mb-4 sm:mb-6 lg:mb-8 sm:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto text-center"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
            >
              <span className="fs-7 fw-medium py-narrow px-2 border rounded-pill text-primary dark:text-tertiary">
                Solutions
              </span>
              <h2 className="h3 lg:h2 m-0 whitespace-nowrap">
                <span className="inline">
                  🎯 Your Career Growth,{" "}
                  <span className="inline px-1 bg-tertiary text-primary">
                    Supercharged
                  </span>
                </span>
              </h2>
              <p className="fs-6 xl:fs-3 xl:px-8">
                Real-time career coaching tailored uniquely to you.
                <br />
                <br />
                Say goodbye to guesswork and hello to professional confidence,
                powered by the world&apos;s smartest AI coach.
              </p>
            </div>
            <div
              className="features-items row child-cols-12 sm:child-cols-6 lg:child-cols-4 g-4 lg:g-6 col-match"
              data-anime="onview: -200; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 400});"
            >
              {features9.map((feature: Feature, index: number) => {
                let description = "";
                if (feature.title === "Instant clarity") {
                  description = "✅ Make better career decisions faster";
                } else if (feature.title === "Always available") {
                  description = "✅ Your mentor, coach, and consultant—on demand";
                } else if (feature.title === "Trackable progress") {
                  description = "✅ Measure growth through your personal dashboard";
                }
                return (
                  <div key={index} className={feature.order}>
                    <div className="features-item vstack items-center justify-center text-center gap-4">
                      <div className="icon-box cstack w-48px h-48px dark:bg-tertiary rounded">
                        <Image
                          className="w-24px xl:w-32px text-primary-400 dark:text-tertiary"
                          alt="feature-icon"
                          src={feature.icon}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="panel">
                        <div className="vstack gap-1">
                          <h3 className="title h6 m-0">{feature.title}</h3>
                          <p className="desc fs-6 opacity-60 dark:opacity-90">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="pre-cta vstack items-center gap-1 max-w-400px lg:max-w-750px mx-auto text-center mt-6 xl:mt-10"
              data-anime="onview:-100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});"
            >
              <h2 className="h4 xl:h3 m-0">
                Forget career confusion. Welcome professional clarity.
              </h2>
              <p className="fs-6 sm:fs-5 text-dark dark:text-white text-opacity-70">
                Say goodbye to Freezing in your interview.
              </p>
              <div
                    className="vstack md:hstack justify-center gap-2 mt-3"
                    style={{ transform: "translateY(0px)", opacity: 1 }}
                  >
                    <a
                      href="#"
                      className="btn btn-md xl:btn-lg btn-alt-dark border-dark px-3 lg:px-5 fw-bold contrast-shadow-sm hover:contrast-shadow"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsModalOpen(true);
                      }}
                    >
                      ✨ Start Talking to Your AI Coach ✨
                    </a>
                  </div>
              <span className="fs-7 mt-1">No Registration required for a free trial!</span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <LiveKitModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Solutions;
