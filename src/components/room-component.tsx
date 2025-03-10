"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";

// import { ConfigurationForm } from "@/components/configuration-form";
import { Chat } from "@/components/chat";
import { Transcript } from "@/components/transcript";
import { useConnection } from "@/hooks/use-connection";
import { AgentProvider } from "@/hooks/use-agent";
import { useRef } from "react";


export function RoomComponent() {
  const { shouldConnect, wsUrl, token } = useConnection();
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={shouldConnect}
      audio={true}
      className="flex flex-col bg-amber-500 "
      style={{ "--lk-bg": "green" } as React.CSSProperties}
      options={{
        publishDefaults: {
          stopMicTrackOnMute: true,
        },
      }}
    >
      <AgentProvider>
  <div className="hidden overflow-y-auto relative border-r">
    <Chat/>
  </div>
  
  {/* Centered transcription container */}
  <div className="flex flex-col justify-center items-center w-full max-w-3xl mx-auto h-screen">
    <div className="flex-grow overflow-y-auto w-full" ref={transcriptContainerRef}>
      <Transcript
        scrollContainerRef={transcriptContainerRef}
        scrollButtonRef={scrollButtonRef}
      />
    </div>
    <div className="p-4">
      {/* <button
        ref={scrollButtonRef}
        className="p-2 bg-white text-white rounded-full hover:bg-gray-100 transition-colors shadow-md flex items-center"
      >
        <ChevronDown className="mr-1 h-4 w-4" />
        <span className="text-xs pr-1">View latest</span>
      </button> */}
    </div>
  </div>

  <RoomAudioRenderer />
  <StartAudio label="Click to allow audio playback" />
</AgentProvider>

    </LiveKitRoom>
  );
}
