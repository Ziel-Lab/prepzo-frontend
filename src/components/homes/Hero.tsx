"use client";

import React, { useState, useEffect } from "react";
import TyperComponent from "@/components/common/TyperComponent";
import Image from "next/image";
import { useParallax } from "react-scroll-parallax";
import LiveKitPage from "@/components/livekit/LiveKitPage"; // adjust the import path as needed

const Hero: React.FC = () => {
  const [isBackgroundChanged, setIsBackgroundChanged] = useState(false);
  
  const parallax = useParallax({ scale: [0.85, 1.1] });

  useEffect(() => {
    console.log("Hero component mounted");
  }, []);

  // Use Tailwind's dark mode class strategy by checking the <html> element.
  

  // When background is changed, update the body background color.
  useEffect(() => {
    if (isBackgroundChanged) {
      document.documentElement.classList.add('hero-bg-light');
      document.documentElement.classList.add('dark:hero-bg-dark');
    } else {
      document.documentElement.classList.remove('hero-bg-light');
      document.documentElement.classList.remove('dark:hero-bg-dark');
    }
    return () => {
      document.documentElement.classList.remove('hero-bg-light');
      document.documentElement.classList.remove('dark:hero-bg-dark');
    };
  }, [isBackgroundChanged]);
  
  

  // Render the full-page LiveKit content when background is changed.
  if (isBackgroundChanged) {
    return (
      <div id="hero_header" style={{ height: "100vh" }}>
        <LiveKitPage onClose={() => setIsBackgroundChanged(false)} />
      </div>
    );
  }

  return (
    <div
      id="hero_header"
      className="hero-header hero-seven-scene section panel overflow-hidden"
    >
      <div className="position-absolute top-0 start-0 end-0 h-screen bg-tertiary-300 dark:bg-primary-700" />
      <div className="position-absolute top-0 start-0 end-0 h-screen bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
      <div className="section-outer panel pb-6 sm:pb-8 pt-9 xl:pt-10 xl:pb-9">
        <div className="d-none lg:d-block">
          <Image
            alt="Icon"
            className="d-inline-block position-absolute w-72px dark:d-none"
            style={{ top: "15%", left: "10%" }}
            width={85}
            height={73}
            src="assets/images/vectors/marketing.svg"
          />
        </div>
        <div className="container max-w-xl">
          <div className="section-inner panel">
            <div className="row child-cols-12 justify-center items-center g-8">
              <div className="lg:col-8">
                <div className="panel vstack items-center gap-2 px-2 text-center">
                  <span className="fs-9 fw-bold py-narrow px-2 border rounded-pill text-primary dark:text-tertiary flex items-center whitespace-nowrap">
                    <span className="flex -space-x-3 rtl:space-x-reverse">
                      <Image
                        src="/assets/images/avatars/avatar-light.png"
                        alt="Avatar Light"
                        width={50}
                        height={50}
                        className="block dark:hidden w-20 h-20 shrink-0 rounded-full border-2 border-surface-primary object-cover dark:border-dark-surface-primary"
                        style={{ color: "transparent" }}
                      />
                    </span>
                    <span className="ml-3">    300+ happy customers</span>
                  </span>

                  <h1 className="h3 sm:h2 md:h1 lg:display-6 lh-lg mb-1 xl:mb-2 mt-2">
                    Your{" "}
                    <span className="px-1 bg-primary text-tertiary dark:bg-tertiary dark:text-primary">
                      <TyperComponent
                        strings={[
                          "Professional Mentor",
                          "Career Consultant",
                          "Vocational Advisor",
                          "Career Counselor",
                          "Executive Coach",
                          "Career Ally",
                          "Success Partner",
                          "Growth Advocate",
                        ]}
                      />
                    </span>
                  </h1>
                  <h2 className="h4 sm:h3 md:h2 lg:display-7 lh-lg mb-1 xl:mb-2">
                    Powered by AI.
                  </h2>
                  <p className="fs-6 xl:fs-3 xl:px-6">
                    Prepzo helps you craft{" "}
                    <b className="dark:text-white">better applications</b>, build{" "}
                    <b className="dark:text-white">standout resumes</b>, and make{" "}
                    <b className="dark:text-white">career-defining moves</b>.
                  </p>

                  <div className="vstack md:hstack justify-center gap-2 mt-3">
                    <a
                      href="#"
                      className="btn btn-md xl:btn-lg btn-alt-dark border-dark px-3 lg:px-5 fw-bold contrast-shadow-sm hover:contrast-shadow"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsBackgroundChanged(true);
                      }}
                    >
                      ✨ Start Talking to Your AI Coach ✨
                    </a>
                  </div>
                  <div className="panel mt-3 lg:mt-4 min-w-700px text-center">
                    <div className="row child-cols-12 lg:child-cols-4 justify-center gx-0">
                      <span className="fs-7 fw-medium mb-narrow text-inherit">
                        🔹 AI-Powered Coaching
                      </span>
                      <span className="fs-7 fw-medium mb-narrow text-inherit">
                        🔹 Personal Dashboard
                      </span>
                      <span className="fs-7 fw-medium mb-narrow text-inherit">
                        🔹 Real-time Career Insights
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="uc-video-scene"
                ref={parallax.ref as React.RefObject<HTMLDivElement>}
              >
                <div className="panel max-w-1000px mx-auto mt-2 rounded lg:rounded-1-5 xl:rounded-2 border border-dark contrast-shadow-lg overflow-hidden">
                  <video
                    preload="auto"
                    playsInline
                    muted
                    loop
                    autoPlay
                    poster="assets/images/media/lexend-home-7.png"
                    src="/assets/images/media/home.webm"
                    title="Video title"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
