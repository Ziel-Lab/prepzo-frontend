"use client";

import React, { useState, useCallback, useEffect } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import SimpleVoiceAssistant from "@/components/livekit/SimpleVoiceAssistant";
import { MediaDeviceFailure } from "livekit-client";
import type { ConnectionDetails } from "@/app/api/connection-details/route";

interface LiveKitPageProps {
  onClose: () => void;
}

const LiveKitPage: React.FC<LiveKitPageProps> = ({ onClose }) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [connectionDetails, updateConnectionDetails] = useState<ConnectionDetails | undefined>(undefined);

  const onDeviceFailure = (error?: MediaDeviceFailure) => {
    console.error(error);
    alert("Error acquiring camera or microphone permissions. Please ensure permissions are granted.");
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentY = e.touches[0].clientY;
    if (touchStart !== null && currentY - touchStart > 100) {
      onClose();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      onClose();
    }
  };

  const onConnectButtonClicked = useCallback(async () => {
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? "/api/connection-details",
      window.location.origin
    );
    const response = await fetch(url.toString());
    const connectionDetailsData = await response.json();
    updateConnectionDetails(connectionDetailsData);
  }, []);

  // Automatically fetch connection details when the component mounts.
  useEffect(() => {
    onConnectButtonClicked();
  }, [onConnectButtonClicked]);

  return (
    <div
      className="livekit-page-container"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ width: "100%", height: "100%" }}
    >
      <div className="content-container" style={{ width: "100%", height: "calc(100% - 3rem)" }}>
        {!connectionDetails ? (
          <div
            className="loading-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: "1.2rem",
              color: "#666",
            }}
          >
            Loading...
          </div>
        ) : (
          <LiveKitRoom
            token={connectionDetails.participantToken}
            serverUrl={connectionDetails.serverUrl}
            connect={true}
            audio={true}
            video={false}
            onMediaDeviceFailure={onDeviceFailure}
            onDisconnected={() => {
              updateConnectionDetails(undefined);
              if (window.confirm("Do you want to catch up with us over email?")) {
                // Optionally add logic for email follow-up here.
              }
              onClose();
            }}
            className="w-full h-full flex flex-col"
          >
            <SimpleVoiceAssistant onStateChange={() => {}} />
          </LiveKitRoom>
        )}
      </div>
      <div
        className="page-close-container"
        style={{ textAlign: "center", marginTop: "1rem" }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            background: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LiveKitPage;
