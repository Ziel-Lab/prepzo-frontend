'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { ConnectionProvider } from "@/hooks/use-connection";
import { PlaygroundStateProvider } from "@/hooks/use-playground-state";

/**
 * Props for the ClientProviders component
 */
interface ClientProvidersProps {
  /** React children to be wrapped by the providers */
  children: React.ReactNode;
}

/**
 * ClientProviders component that wraps the application with necessary client-side providers
 * 
 * This component sets up:
 * - React Query for data fetching and state management
 * - Tooltip provider for accessible tooltips
 * - Toast notifications for user feedback
 * - Connection provider for managing connection state
 * 
 * Using a client component to wrap providers ensures that server components
 * don't attempt to use client-side features like hooks
 * 
 * @param props - Component props containing children to wrap
 * @returns Component with all providers configured
 */
export default function ClientProviders({
  children,
}: ClientProvidersProps) {
  // Create a new QueryClient instance for each client component render
  // Using useState to ensure the instance persists between renders
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <PlaygroundStateProvider>
      <TooltipProvider>
        <ConnectionProvider>
          <Toaster />
          <Sonner />
          {children}
        </ConnectionProvider>
      </TooltipProvider>
      </PlaygroundStateProvider>
    </QueryClientProvider>
  );
} 