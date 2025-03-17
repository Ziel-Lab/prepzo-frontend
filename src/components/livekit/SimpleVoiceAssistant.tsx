"use client";
import {
  useVoiceAssistant,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
  AgentState,
} from "@livekit/components-react";
import { Track, TrackPublication, Participant } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./SimpleVoiceAssistant.css";

interface SimpleVoiceAssistantProps {
  onStateChange: (state: AgentState) => void;
}

export interface TranscriptionSegment {
  id: string;
  text: string;
  language: string;
  startTime: number;
  endTime: number;
  final: boolean;
  firstReceivedTime: number;
  lastReceivedTime: number;
  receivedAtMediaTimestamp: number;
  receivedAt: number;
}

export interface TranscriptionMessage extends TranscriptionSegment {
  type: "agent" | "user";
}

// Updated Message component with Framer Motion animations and Hume.ai–like styling.
const Message: React.FC<{ type: "agent" | "user"; text: string }> = ({ type, text }) => {
  return (
    <motion.div
      className={
        "w-[80%] bg-card border border-border rounded " +
        (type === "user" ? "ml-auto" : "")
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
    >
      <div className="text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3">
        {type === "agent" ? "Agent" : "You"}
      </div>
      <div className="pb-3 px-3">{text}</div>
    </motion.div>
  );
};

/**
 * Custom hook that always calls useTrackTranscription.
 * Provides fallback values using specific types rather than 'any'.
 */
function useSafeTrackTranscription() {
  const localParticipant = useLocalParticipant();
  const safePublication: TrackPublication =
    localParticipant?.microphoneTrack ?? ({} as TrackPublication);
  const safeParticipant: Participant =
    localParticipant?.localParticipant ?? ({} as Participant);
  return useTrackTranscription({
    publication: safePublication,
    source: Track.Source.Microphone,
    participant: safeParticipant,
  });
}

const SimpleVoiceAssistant: React.FC<SimpleVoiceAssistantProps> = ({ onStateChange }) => {
  const { state, agentTranscriptions } = useVoiceAssistant();
  const { segments: userTranscriptions } = useSafeTrackTranscription();

  const [messages, setMessages] = useState<TranscriptionMessage[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const agentMessages: TranscriptionMessage[] = agentTranscriptions
      ? agentTranscriptions.map((t: TranscriptionSegment) => ({
          ...t,
          type: "agent",
        }))
      : [];
    const userMessages: TranscriptionMessage[] = userTranscriptions
      ? userTranscriptions.map((t: TranscriptionSegment) => ({
          ...t,
          type: "user",
        }))
      : [];
    const allMessages = [...agentMessages, ...userMessages].sort(
      (a, b) => a.firstReceivedTime - b.firstReceivedTime
    );
    setMessages(allMessages);
    onStateChange(state);
  }, [agentTranscriptions, userTranscriptions, state, onStateChange]);

  // Auto-scroll the transcript container on new messages.
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTo({
        top: transcriptRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="voice-assistant-container h-full flex flex-col">
      {/* Transcript Section */}
      <div className="transcript-container flex-1 overflow-auto p-4" ref={transcriptRef}>
        <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <Message key={msg.id || index} type={msg.type} text={msg.text} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Control Bar Section */}
      <div className="controls-container p-4 bg-gradient-to-t from-card via-card/90 to-card/0">
        <div className="voice-control-bar mb-4">
          <VoiceAssistantControlBar />
        </div>
      </div>
    </div>
  );
};

export default SimpleVoiceAssistant;
