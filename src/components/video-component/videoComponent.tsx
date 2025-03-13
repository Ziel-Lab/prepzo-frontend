"use client";

import React, { useState, useEffect } from "react";

function VideoComponent(): React.ReactElement {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    async function fetchVideoSrc() {
      // Replace with your actual asynchronous logic if needed
      const videoSrc = await Promise.resolve(
        "https://www.youtube.com/embed/XwkIAQE_zr8?autoplay=1&mute=1&loop=1&playlist=XwkIAQE_zr8"
      );
      setSrc(videoSrc);
    }
    fetchVideoSrc();
  }, []);

  if (!src) {
    return <div>Loading video...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto w-full h-[1000px]">
      <iframe src={src} allowFullScreen className="w-full h-full" />
    </div>
  );
}

export default VideoComponent;
