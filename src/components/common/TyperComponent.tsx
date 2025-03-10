"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

const demostrings: string[] = ["Bank Account", "Web Payment", " Android & ISO"];

interface TyperComponentProps {
  strings?: string[];
}

const TyperComponent: React.FC<TyperComponentProps> = ({ strings = demostrings }) => {
  return (
    <TypeAnimation
      sequence={[...strings.flatMap((element) => [element, 2000])]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
  );
};

export default TyperComponent;
