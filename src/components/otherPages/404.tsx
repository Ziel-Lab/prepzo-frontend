"use client";
import React from "react";
import Link from "next/link";
import { openSearchModal } from "@/utlis/toggleSearchModal";

const NotFound: React.FC = (): React.ReactElement => {
  return (
    <div className="section py-6 sm:py-9">
      <div className="container max-w-xl">
        <div className="panel vstack justify-center items-center gap-2 sm:gap-4 text-center">
          <h2 className="display-5 sm:display-2 fw-normal text-gray-200">
            404
          </h2>
          <h1 className="h3 sm:h1 m-0">Page not found</h1>
          <p className="fs-6">
            Sorry, the page you seem to be looking for <br />
            has been moved, redirected, or removed permanently.
          </p>
          <Link
            href="/"
            className="btn btn-sm sm:btn-md btn-primary text-white my-2 sm:my-0"
          >
            Go back home
          </Link>
          <p>
            Why not try to search again?{" "}
            <a className="uc-link" onClick={openSearchModal} data-uc-toggle>
              Search now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
