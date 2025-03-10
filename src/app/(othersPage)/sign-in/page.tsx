import React, { FC } from "react";
import SignIn from "@/components/otherPages/SignIn";

export const metadata = {
  title: "Signin || Prepzo AI Interview Coach",
  description:
    "Prepzo AI Interview Coach helps you prepare for interviews with personalized coaching.",
};

const SigninPage: FC = () => {
  return (
    <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
      <div id="wrapper" className="wrap">
        <SignIn />
      </div>
    </div>
  );
};

export default SigninPage;
