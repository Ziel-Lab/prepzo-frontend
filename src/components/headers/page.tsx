"use client";
import React, { useEffect, useState } from "react";
import { featurePageLinks, sections} from "@/data/menu";
import { openMobileMenu } from "@/utils/toggleMobileMenu";
import Image from "next/image";
import Link from "next/link";
import ModalVideo from "../common/ModalVideo";

interface HeaderProps {
  staticPosition?: boolean;
}

const Header: React.FC<HeaderProps> = ({ staticPosition = false }) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [scrollingUp, setScrollingUp] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setPrevScrollPos(window.scrollY);
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setScrollingUp(currentScrollPos <= 80 ? false : isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const header = document.querySelector(".header-seven .uc-navbar-container");
    const menuItems = document.querySelectorAll(".header-seven .has-dd-menu");

    if (!header || menuItems.length === 0) return;

    const handleMouseEnter = () =>
      header.classList.remove("uc-navbar-transparent");
    const handleMouseLeave = () =>
      header.classList.add("uc-navbar-transparent");

    menuItems.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <header
        className={`uc-header header-seven uc-navbar-sticky-wrap z-999 uc-sticky ${
          scrollingUp ? " uc-sticky-below uc-sticky-fixed headerFixed" : ""
        }`}
        data-uc-sticky="start: 100vh; show-on-up: true; animation: uc-animation-slide-top; sel-target: .uc-navbar-container; cls-active: uc-navbar-sticky; cls-inactive: uc-navbar-transparent; end: !*;"
      >
        <nav
          className={`uc-navbar-container uc-navbar-float ft-tertiary z-1 uc-navbar-transparent ${
            scrollingUp ? "uc-navbar-sticky" : "uc-navbar-transparent"
          } ${staticPosition ? "position-static" : ""}`}
          data-anime="translateY: [-40, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 0;"
          style={{ transform: "translateY(0px)", opacity: 1 }}
        >
          <div
            className="uc-navbar-main"
            style={{ "--uc-nav-height": "64px" } as React.CSSProperties}
          >
            <div className="container">
              <div
                className="uc-navbar min-h-64px text-gray-900 dark:text-white position-static"
                data-uc-navbar=" animation: uc-animation-slide-top-small; duration: 150;"
              >
                <div className="uc-navbar-left">
                  <div className="uc-logo">
                    <Link
                      className="panel text-none"
                      href={`/`}
                      style={{ width: 140 }}
                    >
                      <Image
                        className="dark:d-none"
                        alt="Lexend"
                        width={128}
                        height={34}
                        src="/assets/images/common/prepzo-dark.svg"
                      />
                      <Image
                        className="d-none dark:d-block"
                        alt="Lexend"
                        width={128}
                        height={34}
                        src="/assets/images/common/prepzo-light.svg"
                      />
                    </Link>
                  </div>
                  <ul className="uc-navbar-nav gap-3 d-none lg:d-flex ltr:ms-2 rtl:me-2">
                    <li className="has-dd-menu">
                      <a href="#" role="button" aria-haspopup="true">
                        Products{" "}
                        <span
                          data-uc-navbar-parent-icon=""
                          className="uc-icon uc-navbar-parent-icon"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <polyline
                              fill="none"
                              stroke="#000"
                              strokeWidth="1.1"
                              points="1 3.5 6 8.5 11 3.5"
                            ></polyline>
                          </svg>
                        </span>
                      </a>
                      <div
                        className="uc-dropbar uc-dropbar-top p-0 ft-primary text-unset fs-6 fw-normal hide-scrollbar border-top rounded-0 overflow-hidden shadow-xl bg-white dark:bg-gray-900 uc-navbar-dropdown uc-drop"
                        data-uc-drop=" offset: 0; boundary: true; stretch: x; animation: uc-animation-slide-top-small; animate-out: uc-animation-slide-top-small; duration: 150;"
                        style={{
                          overflowX: "auto",
                          top: 64,
                          left: "0",
                          width: "100vw",
                        }}
                      >
                        <div className="uc-dropbar-content">
                          <div className="container">
                            <div className="uc-dropbar-inner after-bg">
                              <div className="row gx-5 col-match justify-between">
                                <div className="col-8">
                                  <div className="panel vstack gap-4 py-4">
                                    <div className="panel vstack gap-4">
                                      <div className="vstack gap-narrow">
                                      <h5 className="h5 xl:h4 fw-medium m-0">
                                        Prepzo&apos;s AI Interview Coach
                                      </h5>
                                        <p className="fs-7 text-gray-300">
                                          AI-Powered Interview Coaching
                                        </p>
                                      </div>
                                      <div className="row child-cols-6 gx-6">
                                        {featurePageLinks.map(
                                          (section, index) => (
                                            <div
                                              key={index}
                                              className="vstack gap-3"
                                            >
                                              <h6 className="h6 m-0">
                                                <i
                                                  className={`fs-7 ${section.icon} fw-bold ltr:me-narrow rtl:ms-narrow`}
                                                ></i>{" "}
                                                {section.title}
                                              </h6>
                                              {section.items.map(
                                                (item, idx) => (
                                                  <div key={idx}>
                                                    <Link
                                                      href={`/page-features`}
                                                      className="hstack items-start gap-2 text-none text-dark dark:text-white hover:text-primary dark:hover:text-tertiary"
                                                    >
                                                      <span className="icon rounded dark:bg-white">
                                                        <Image
                                                          className="w-32px"
                                                          alt="icon"
                                                          src={`/assets/images/custom-icons/${item.icon}`}
                                                          width={24}
                                                          height={24}
                                                        />
                                                      </span>
                                                      <div className="panel">
                                                        <span className="fs-7 fw-medium mb-narrow text-inherit">
                                                          {item.title}
                                                        </span>
                                                        <p className="fs-8 text-muted">
                                                          {item.description}
                                                        </p>
                                                      </div>
                                                    </Link>
                                                  </div>
                                                )
                                              )}
                                              <div>
                                                <Link
                                                  href={`/page-features`}
                                                  className="ltr:ms-6 rtl:me-6 text-none fs-8 text-dark dark:text-white hover:text-primary dark:hover:text-tertiary"
                                                >
                                                  <span className="border-bottom hover:border-primary duration-150">
                                                    {section.viewAllText}
                                                  </span>
                                                  <i className="fs-8 unicon-arrow-up-right fw-bold"></i>
                                                </Link>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="panel vstack gap-4 p-5 bg-gray-25 dark:bg-gray-800 border-start">
                                    {sections.map((section, index) => (
                                      <div
                                        key={index}
                                        className="panel category-section"
                                      >
                                        <h5 className="h6">{section.title}</h5>
                                        <ul className="uc-nav uc-navbar-dropdown-nav fs-7 fw-normal row child-cols-12">
                                          {section.links.map((link, i) => (
                                            <li key={i}>
                                              <Link href={link.href}>
                                                {link.text}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="uc-dropbar-footer py-2 xl:py-3 border-top bg-white dark:bg-gray-900 dark:text-white">
                          <div className="container">
                            <ul className="nav-x gap-4 fs-8 fw-medium">
                              <li>
                                <a href="#">
                                  <i className="fs-8 unicon-api fw-bold"></i>
                                  <span className="border-bottom hover:border-primary duration-150">
                                    Explore Prepzo
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fs-8 unicon-airplay fw-bold"></i>
                                  <span className="border-bottom hover:border-primary duration-150">
                                    AI Interview Coach
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fs-8 unicon-cloud-lightning fw-bold"></i>
                                  <span className="border-bottom hover:border-primary duration-150">
                                    Join Prepzo Early Access
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link href={`/blog-sidebar`}>Insights</Link>
                    </li>
                    <li>
                      <Link href={`/page-pricing-2`}>Pricing</Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon unicon-cube fw-bold ltr:me-narrow rtl:ms-narrow text-primary dark:text-tertiary"></i>
                        <span>Resume Builder</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="uc-navbar-right">
                  <ul className="nav-x d-none lg:d-flex">
                    <li className="d-none xl:d-inline-flex">
                      <Link href={`/page-contact-2`}>Contact sales</Link>
                    </li>
                    <li>
                      <Link href={`/sign-in`}>Log in</Link>
                    </li>
                  </ul>
                  <Link
                    className="btn btn-sm btn-primary text-tertiary dark:bg-tertiary dark:text-primary dark:hover:bg-tertiary fw-bold rounded-pill lg:px-2 text-none hover:contrast-shadow d-none lg:d-inline-flex"
                    href={`/sign-up`}
                  >
                    Sign up
                  </Link>
                  <a
                    className="d-block lg:d-none uc-icon uc-navbar-toggle-icon"
                    onClick={openMobileMenu}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <rect className="line-1" y="3" width="20" height="2"></rect>
                      <rect className="line-2" y="9" width="20" height="2"></rect>
                      <rect className="line-3" y="9" width="20" height="2"></rect>
                      <rect className="line-4" y="15" width="20" height="2"></rect>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ModalVideo
        isOpen={isOpen}
        src="/assets/images/media/lexend_vid.webm"
        setIsOpen={() => setIsOpen(false)}
      />
    </>
  );
};

export default Header;
