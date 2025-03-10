import React from "react";
import Header from "@/components/headers/page";
import Footer from "@/components/footers/page";

export const metadata = {
  title: "Home || Prepzo - AI Interview Coach for Career Success",
  description:
    "Prepzo - Unlock your interview potential and ace every interview with our powerful AI interview coach app.",
};

const DefaultPage = () => {
  return React.createElement(
    "div",
    {
      className:
        "page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready",
    },
    React.createElement(Header, null),
    React.createElement("div", { id: "wrapper", className: "wrap" }),
    React.createElement(Footer, null)
  );
};

export default DefaultPage;
