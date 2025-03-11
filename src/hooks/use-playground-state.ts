"use client";
import { useState } from "react";

interface PlaygroundState {
  openaiAPIKey: string;
}

export function usePlaygroundState() {
  const [state, setState] = useState<PlaygroundState>({ openaiAPIKey: "" });

  function updatePgState(newState: { openaiAPIKey: string }) {
    console.log("Updating playground state with", newState);
    setState(newState);
  }

  return { ...state, updatePgState };
}