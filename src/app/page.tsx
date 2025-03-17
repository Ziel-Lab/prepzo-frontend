import React from "react";
import Footer from "@/components/footers/page";
import Header from "@/components/headers/page";
import Topbar from "@/components/headers/Topbar";
import Blogs from "@/components/homes/Blogs";
import Brands from "@/components/homes/Brands";
import Cta from "@/components/homes/Cta";
import Faqs from "@/components/homes/Faqs";
import Hero from "@/components/homes/Hero";
import Solutions from "@/components/homes/Solutions";


export const metadata = {
  title: "Home || Prepzo - AI Interview Coach for Career Success",
  description:
    "Prepzo - Unlock your interview potential and ace every interview with our powerful AI interview coach app.",
};

const Page: React.FC = () => {
  return (
    <div className="theme-3">
      <div className="bp-xs page-wrapper home-7 bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel bg-white text-gray-900 dark:bg-black dark:text-gray-200 overflow-x-hidden disable-cursor">
        <Topbar />
        <Header />
        <div id="wrapper" className="wrap">
          <Hero />
          <Brands />
          {/* <Features /> */}
          <Solutions />
          {/* <Pricing /> */}
          {/* <Testimonials /> */}
          <Faqs />
          <Blogs />
          <Cta />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
