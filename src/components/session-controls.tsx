"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";

import {
  TrackToggle,
  useLocalParticipant,
  useMediaDeviceSelect,
} from "@livekit/components-react";
import { Track } from "livekit-client";

import { useConnection } from "@/hooks/use-connection";

export function SessionControls() {
  const localParticipant = useLocalParticipant();
  const deviceSelect = useMediaDeviceSelect({ kind: "audioinput" });
  const { disconnect } = useConnection();
  const [isMuted, setIsMuted] = useState(localParticipant.isMicrophoneEnabled === false);

  useEffect(() => {
    if(localParticipant.isMicrophoneEnabled !== !isMuted) {
      setIsMuted(localParticipant.isMicrophoneEnabled === false);
    }
  }, [localParticipant.isMicrophoneEnabled]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-full bg-neutral-100 text-secondary-foreground">
        <div className="flex gap-2 items-center">
          <TrackToggle
            source={Track.Source.Microphone}
            className={`inline-flex items-center justify-center rounded-l-full px-3 py-2 ${
              isMuted ? "opacity-50" : ""
            }`}
            showIcon={false}
          >
            {isMuted ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </TrackToggle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              
              className="px-2 shadow-none hover:bg-neutral-200/80 rounded-l-none rounded-r-full border-l-[1px] border-neutral-200 text-sm font-semibold"
            >
              <ChevronDown className="h-4 w-4 text-secondary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            alignOffset={-5}
            className="w-[280px]"
            forceMount
          >
            <DropdownMenuLabel className="text-xs uppercase tracking-widest">
              Available inputs
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {deviceSelect.devices.map((device, index) => (
              <DropdownMenuCheckboxItem
                key={`device-${index}`}
                className="text-xs"
                checked={device.deviceId === deviceSelect.activeDeviceId}
                onCheckedChange={() =>
                  deviceSelect.setActiveMediaDevice(device.deviceId)
                }
              >
                {device.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button  
        onClick={disconnect}
        className="px-4 text-black py-2 h-9 rounded-full"
      >
        End Call
      </Button>
    </div>
  );
}
