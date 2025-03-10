import React from "react";
import Header from "@/components/headers/page";
import Footer from "@/components/footers/page";
import Breadcrumb from "@/components/otherPages/BreadCrumb";
import Notfound from "@/components/otherPages/404";

export const metadata = {
  title: "Not Found || Prepzo - AI Interview Coach for Career Success",
  description:
    "Prepzo - Unlock your interview potential and ace every interview with our powerful AI interview coach app.",
};

const NotFoundPage: React.FC = () => {
  return (
    <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
      <Header />
      <div id="wrapper" className="wrap">
        <Breadcrumb />
        <Notfound />
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
