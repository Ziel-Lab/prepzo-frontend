import React, { FC } from "react";
import Signup from "@/components/otherPages/SignUp";

export const metadata = {
  title: "Signup || Prepzo AI Interview Coach",
  description:
    "Prepzo AI Interview Coach helps you prepare for interviews with personalized coaching.",
};

const SignupPage: FC = () => {
  return (
    <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
      <div id="wrapper" className="wrap">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
