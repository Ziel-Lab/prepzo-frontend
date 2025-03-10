import { cn } from "@/lib/utils";
import { useAgent } from "@/hooks/use-agent";
import { useEffect, useRef, RefObject, useState } from "react";
import { Lightbulb, MessageSquare,CircleHelp } from 'lucide-react';
export function Transcript({
  scrollContainerRef,
  scrollButtonRef,
}: {
  scrollContainerRef: RefObject<HTMLElement>;
  scrollButtonRef: RefObject<HTMLButtonElement>;
}) {
  const { displayTranscriptions } = useAgent();
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const lastScrollPosition = useRef(0);
  
  const calculateDistanceFromBottom = (container: HTMLElement) => {
    const { scrollHeight, scrollTop, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight;
  };

  const handleScrollVisibility = (
    container: HTMLElement,
    scrollButton: HTMLButtonElement,
  ) => {
    const distanceFromBottom = calculateDistanceFromBottom(container);
    const shouldShowButton = distanceFromBottom > 100;
    
    // Only update if the state needs to change to avoid unnecessary renders
    if (showScrollButton !== shouldShowButton) {
      setShowScrollButton(shouldShowButton);
      scrollButton.style.display = shouldShowButton ? "flex" : "none";
    }
    
    // Detect if user manually scrolled up
    if (container.scrollTop < lastScrollPosition.current) {
      setIsAutoScrollEnabled(false);
    }
    
    // Update last scroll position
    lastScrollPosition.current = container.scrollTop;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const scrollButton = scrollButtonRef.current;
    if (container && scrollButton) {
      const handleScroll = () =>
        handleScrollVisibility(container, scrollButton);

      handleScroll(); // Check initial state
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [
    scrollContainerRef,
    scrollButtonRef,
    showScrollButton,
  ]);

  // Handle auto-scrolling when new transcriptions arrive
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && displayTranscriptions.length > 0) {
      const distanceFromBottom = calculateDistanceFromBottom(container);
      
      // If near bottom (within 100px) or auto-scroll is enabled, scroll to latest message
      if (distanceFromBottom < 100 || isAutoScrollEnabled) {
        // Use requestAnimationFrame to ensure DOM is updated before scrolling
        requestAnimationFrame(() => {
          transcriptEndRef.current?.scrollIntoView({ 
            behavior: "smooth", 
            block: "end" // Only scroll enough to make the element visible
          });
        });
      }
    }
  }, [displayTranscriptions, scrollContainerRef, isAutoScrollEnabled]);

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
    setIsAutoScrollEnabled(true);
  };

  useEffect(() => {
    const scrollButton = scrollButtonRef.current;
    if (scrollButton) {
      scrollButton.addEventListener("click", scrollToBottom);
      return () => scrollButton.removeEventListener("click", scrollToBottom);
    }
  }, [scrollButtonRef]);

  return (
    <>
      <div className="p-4 min-h-[300px]">
        {displayTranscriptions.length === 0 ? (
          <div>
          

<div className="text-center text-gray-900 text-xs mt-8">
  
  <p className="text-gray-400">Click Connect to enable your microphone and begin.</p>
</div>
          </div>
        ) : (
          <div className="space-y-4">
            {displayTranscriptions.map(
              ({ segment, participant, publication }) =>
                segment.text.trim() !== "" && (
                  <div
                    key={segment.id}
                    className={cn(
                      "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      participant?.isAgent
                        ? "bg-neutral-100 text-[#09090B]"
                        : "ml-auto border bg-[#00BBFF] text-[#09090B] ",
                    )}
                  >
                    {segment.text.trim()}
                  </div>
                ),
            )}
            {/* Invisible marker for scroll target - height 0 prevents excessive scrolling */}
            <div ref={transcriptEndRef} style={{ height: 0 }} />
          </div>
        )}
      </div>
    </>
  );
}