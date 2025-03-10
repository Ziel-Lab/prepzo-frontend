"use client";
import React, { useState } from "react";

const languages: string[] = ["English", "العربية", "中文", "हिंदी"];

const LanguageSelect: React.FC = () => {
  const [langOpen, setLangOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>(languages[0]);

  return (
    <div className="d-inline-block" style={{ position: "relative" }}>
      <a
        onClick={() => setLangOpen((prev) => !prev)}
        className="hstack gap-1 text-none fw-medium"
        role="button"
        aria-expanded={langOpen}
        aria-haspopup="true"
      >
        <i className="icon icon-1 unicon-earth-filled" />
        <span>{selectedLang}</span>
        <span
          data-uc-drop-parent-icon=""
          className="uc-icon uc-drop-parent-icon"
        >
          <svg width={12} height={12} viewBox="0 0 12 12">
            <polyline
              fill="none"
              stroke="#000"
              strokeWidth="1.1"
              points="1 3.5 6 8.5 11 3.5"
            />
          </svg>
        </span>
      </a>
      <div
        className={`p-2 bg-white dark:bg-gray-800 shadow-xs rounded w-150px uc-drop ${
          langOpen ? "uc-open" : ""
        }`}
        style={{
          bottom: "40px",
          right: 0,
          maxWidth: 1428,
        }}
      >
        <ul className="nav-y gap-1 fw-medium items-end">
          {languages.map((language, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedLang(language);
                setLangOpen(false);
              }}
            >
              <a>{language}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelect;
