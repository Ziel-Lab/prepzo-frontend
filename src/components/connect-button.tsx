"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useConnection } from "@/hooks/use-connection";
import { Loader2, Mic } from "lucide-react";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { AuthDialog } from "./auth";

export function ConnectButton() {
  const { connect, disconnect, shouldConnect } = useConnection();
  const [connecting, setConnecting] = useState<boolean>(false);
  const { pgState } = usePlaygroundState();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [initiateConnectionFlag, setInitiateConnectionFlag] = useState(false);

  const handleConnectionToggle = async () => {
    if (shouldConnect) {
      await disconnect();
    } else {
      if (!pgState.openaiAPIKey) {
        setShowAuthDialog(true);
        setTimeout(() => handleAuthComplete(), 100);
      } else {
        await initiateConnection();
      }
    }
  };

  const initiateConnection = useCallback(async () => {
    setConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setConnecting(false);
    }
  }, [connect]);

  const handleAuthComplete = () => {
    setShowAuthDialog(false);
    setInitiateConnectionFlag(true);
  };

  useEffect(() => {
    if (initiateConnectionFlag && pgState.openaiAPIKey) {
      initiateConnection();
      setInitiateConnectionFlag(false);
    }
  }, [initiateConnectionFlag, initiateConnection, pgState.openaiAPIKey]);

  return (
    <>
      <button
        onClick={handleConnectionToggle}
        disabled={connecting || shouldConnect}
        className="inline-flex items-center gap-2 px-6 py-2 h-10 text-sm font-medium bg-[#00BBFF] text-black hover:bg-[#00BBFF]/90 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {connecting || shouldConnect ? (
          <>
            {/* <Loader2 className="h-4 w-4 animate-spin" /> */}
            Connecting...
          </>
        ) : (
          <>
            <Mic className="h-4 w-4" />
            Connect
          </>
        )}
      </button>
      {/* {showAuthDialog && <AuthDialog />} */}
    </>
  );
}
