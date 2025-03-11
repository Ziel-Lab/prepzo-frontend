"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "./bot.css";

const Chat = dynamic(() => import("@/components/humebot/components/Chat"), {
  ssr: false,
});

async function getHumeToken() {
  try {
    const response = await fetch("/api/humebot", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get Hume token");
    }

    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error("Error fetching Hume token:", error);
    return null;
  }
}

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const token = await getHumeToken();
      setAccessToken(token);
      setLoading(false);
    }

    fetchToken();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!accessToken) {
    return <div className="flex items-center justify-center min-h-screen">Error: Unable to fetch Hume access token</div>;
  }

  return (
    <div className="grow flex flex-col min-h-screen">
      <Chat accessToken={accessToken} />
    </div>
  );
}
