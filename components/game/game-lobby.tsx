"use client";

import { useState } from "react";

import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import type { PublicGameState } from "@/lib/game/types";

type GameLobbyProps = {
  onJoined: (payload: {
    roomId: string;
    playerId: string;
    code: string;
    state: PublicGameState;
  }) => void;
};

export function GameLobby({ onJoined }: GameLobbyProps) {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState<"create" | "join" | null>(null);
  const [error, setError] = useState("");

  const createRoom = async () => {
    setLoading("create");
    setError("");
    try {
      const response = await fetch("/api/game/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not create room.");
      onJoined({
        roomId: data.roomId,
        playerId: data.playerId,
        code: data.code,
        state: data.state,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create room.");
    } finally {
      setLoading(null);
    }
  };

  const joinRoom = async () => {
    setLoading("join");
    setError("");
    try {
      const response = await fetch("/api/game/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: roomCode, playerName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not join room.");
      onJoined({
        roomId: data.roomId,
        playerId: data.playerId,
        code: data.code,
        state: data.state,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join room.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
      <SpotlightCard className="p-6 lg:p-8">
        <p className="text-xs tracking-[0.28em] text-purple-light uppercase">Arena PvP</p>
        <h1 className="font-magneto mt-3 text-3xl text-foreground sm:text-4xl">Laser Survival</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Enter a room, dodge the rock field, and eliminate opponents with your laser. Rocks
          fade and disappear over time, opening up the arena. Last player standing wins.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-muted">
          <li>WASD — move</li>
          <li>Mouse — aim</li>
          <li>Click / Space — fire laser</li>
          <li>2–4 players per room</li>
        </ul>
      </SpotlightCard>

      <SpotlightCard className="space-y-4 p-6 lg:p-8">
        <label className="block space-y-2">
          <span className="text-sm text-foreground">Display name</span>
          <input
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Your name"
            maxLength={16}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-purple/50"
          />
        </label>

        <button
          type="button"
          onClick={createRoom}
          disabled={loading !== null}
          className="w-full rounded-full bg-gradient-to-r from-purple to-purple-light px-6 py-3 text-sm font-medium text-white transition hover:shadow-[0_0_32px_rgba(168,85,247,0.4)] disabled:opacity-60"
        >
          {loading === "create" ? "Creating..." : "Create Room"}
        </button>

        <div className="relative py-2 text-center text-xs tracking-[0.2em] text-muted uppercase">
          <span className="bg-[rgba(8,8,8,0.9)] px-3">or join</span>
          <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-white/10" />
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-foreground">Room code</span>
          <input
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase outline-none transition focus:border-purple/50"
          />
        </label>

        <button
          type="button"
          onClick={joinRoom}
          disabled={loading !== null || roomCode.length < 4}
          className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium transition hover:border-purple/40 hover:text-purple-light disabled:opacity-60"
        >
          {loading === "join" ? "Joining..." : "Join Room"}
        </button>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </SpotlightCard>
    </div>
  );
}
