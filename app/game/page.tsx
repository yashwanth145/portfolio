"use client";

import { useEffect, useState } from "react";

import { GameArena } from "@/components/game/game-arena";
import { GameLobby } from "@/components/game/game-lobby";
import type { PublicGameState } from "@/lib/game/types";

type Session = {
  roomId: string;
  playerId: string;
  code: string;
  state: PublicGameState;
};

const SESSION_KEY = "portfolio-game-session";

export default function GamePage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    try {
      setSession(JSON.parse(raw) as Session);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const handleJoined = (payload: Session) => {
    setSession(payload);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  };

  const handleLeave = () => {
    setSession(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <div className="px-6 py-10 lg:px-8 lg:py-14">
      {session ? (
        <GameArena
          roomId={session.roomId}
          playerId={session.playerId}
          initialState={session.state}
          onLeave={handleLeave}
        />
      ) : (
        <GameLobby onJoined={handleJoined} />
      )}
    </div>
  );
}
