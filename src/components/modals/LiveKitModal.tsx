"use client";
import React, { useState, useCallback, useEffect } from "react";
import { LiveKitRoom, AgentState } from "@livekit/components-react";
import "@livekit/components-styles";
import SimpleVoiceAssistant from "@/components/livekit/SimpleVoiceAssistant";
import { MediaDeviceFailure } from "livekit-client";
import type { ConnectionDetails } from "@/app/api/connection-details/route";

interface LiveKitModalProps {
  onClose: () => void;
}

const LiveKitModal: React.FC<LiveKitModalProps> = ({ onClose }) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [connectionDetails, updateConnectionDetails] = useState<ConnectionDetails | undefined>(undefined);
  const [agentState, setAgentState] = useState<AgentState>("disconnected");

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

  // Automatically fetch connection details when the modal mounts.
  useEffect(() => {
    onConnectButtonClicked();
  }, [onConnectButtonClicked]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="content-container">
          {!connectionDetails ? (
            <div className="loading-container">Loading...</div>
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
              <SimpleVoiceAssistant onStateChange={setAgentState} />
            </LiveKitRoom>
          )}
        </div>
        <div className="modal-close-container">
          <button onClick={onClose} className="modal-close-btn">
            Close
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 1rem;
          width: 65%;
          height: 65%;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .content-container {
          flex: 1;
          overflow: hidden;
        }
        .modal-close-container {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        .modal-close-btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: none;
          background: #333;
          color: #fff;
          cursor: pointer;
        }
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 1.2rem;
          color: #666;
        }
        @media (max-width: 768px) {
          .modal-content {
            width: 90%;
            height: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveKitModal;
