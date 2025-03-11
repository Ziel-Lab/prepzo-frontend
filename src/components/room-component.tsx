"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";

// import { ConfigurationForm } from "@/components/configuration-form";
import { Chat } from "@/components/chat";
// import { Chat } from "@livekit/components-react";
import { Transcript } from "@/components/transcript";
import { useConnection } from "@/hooks/use-connection";
import { AgentProvider } from "@/hooks/use-agent";
import { useRef } from "react";
import { ChevronDown, Mic, PhoneOff } from "lucide-react";
import { Button } from "./ui/button";

export function RoomComponent() {
  const { shouldConnect, wsUrl, token, disconnect } = useConnection();
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  
  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={shouldConnect}
      audio={true}
      className="flex flex-col h-screen relative bg-white"
      options={{
        publishDefaults: {
          stopMicTrackOnMute: true,
        },
      }}
    >
      <AgentProvider>
        {/* Transcript container */}
        {/* <div 
          className="flex-1 overflow-y-auto pb-24" 
          ref={transcriptContainerRef}
        >
          <div className="max-w-3xl mx-auto">
            <Transcript
              scrollContainerRef={transcriptContainerRef}
              scrollButtonRef={scrollButtonRef}
            />
          </div>
        </div>

        {/* Scroll to bottom button 
        <button
          ref={scrollButtonRef}
          className="fixed bottom-24 right-6 bg-white rounded-full shadow-lg p-2 hidden items-center justify-center"
          style={{ display: "none" }}
        >
          <ChevronDown className="h-5 w-5 text-gray-600" />
        </button>

        {/* Fixed controls container 
        <div className="z-50 flex  justify-center">
          <div className="rounded-full px-4 py-2 flex items-center gap-3">
            <div className="flex flex-row items-center gap-2">
              <RoomAudioRenderer />
              <Chat />
            </div>
            <StartAudio label="Click to allow audio playback" />
          </div>
        </div> */}

        {/* End Call button */}
        {/* <div className="fixed bottom-6 right-6"> */}
          {/* <Button
            variant="destructive"
            className="rounded-full h-12 w-12 flex items-center justify-center"
            onClick={disconnect}
          >
            <PhoneOff className="h-5 w-5" />
          </Button> */}
        {/* </div> */}

        
        <Transcript scrollContainerRef={transcriptContainerRef} scrollButtonRef={scrollButtonRef}/>
        <div className="flex justify-center items-center mx-auto w-screen">
          <Chat />
        </div>
        <RoomAudioRenderer />
        
        <StartAudio label="Click to allow audio playback" />
      </AgentProvider>
    </LiveKitRoom>
  );
}
