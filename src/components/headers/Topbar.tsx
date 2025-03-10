import React from "react";

const Topbar: React.FC = () => {
  return (
    <div
      className="uc-banner-top py-1 p-2 m-0 hide-on-sticky text-center bg-gradient-to-r from-primary dark:from-tertiary-200 to-primary-700 dark:to-tertiary text-white dark:text-dark"
      data-uc-alert=""
      data-anime="opacity: [0, 1]; easing: easeInOutcubic; duration: 500; delay: 0;"
    >
      <a
        href="#"
        className="uc-alert-close top-0 end-0"
        style={{ margin: 14 }}
        data-uc-close=""
      />
      <p>
        Welcome to Prepzo – Unlock your interview potential with our AI Interview Coach.
        <br className="d-block lg:d-none" />
        <a
          href="https://prepzo.ai"
          className="uc-link text-tertiary dark:text-primary border-bottom"
          target="_blank"
          rel="nofollow"
        >
          Learn more!
        </a>
      </p>
    </div>
  );
};

export default Topbar;
