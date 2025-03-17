"use client";
import React , { useState} from "react";
import Image from "next/image";
import LiveKitModal from "@/components/modals/LiveKitModal";

const Cta: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      id="uc_cta"
      className="uc-cta panel mb-n4 z-1"
      data-anime="onview: -200; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500;"
    >
      <div className="container">
        <div className="panel vstack items-center gap-2 p-4 lg:p-6 xl:p-9 bg-gradient-45 from-primary to-primary-800 rounded-2 text-center text-white uc-dark">
          <Image
            className="position-absolute text-tertiary d-none lg:d-block"
            alt="stars"
            style={{ bottom: "25%", left: "10%" }}
            data-uc-svg=""
            src="/assets/images/common/stars.svg"
            width={55}
            height={49}
          />
          <Image
            className="position-absolute text-tertiary d-none lg:d-block"
            alt="star"
            style={{ top: "25%", right: "10%" }}
            data-uc-svg=""
            src="/assets/images/common/star.svg"
            width={19}
            height={29}
          />
          <h2 className="h2 xl:display-6 lh-lg m-0 max-w-md mx-auto text-inherit">
            <span className="px-1 bg-tertiary text-primary d-block lg:d-inline-block">
              Personalized, empathetic coaching
            </span>{" "}
            to power up your professional life.
          </h2>
          <p className="fs-6 sm:fs-5">
            No more generic career advice. Experience instant clarity, actionable insights, and measurable growth—all through 
            friendly, intelligent conversations.
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
          <span className="fs-7 mt-1">No credit card required!</span>
        </div>
      </div>
      {isModalOpen && <LiveKitModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Cta;
