declare module "@livekit/react-components" {
  import React from "react";
  export interface RoomProps {
    token: string;
    serverUrl: string;
  }
  export const Room: React.ComponentType<RoomProps>;
}