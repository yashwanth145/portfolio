"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GameCanvas } from "@/components/game/game-canvas";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import type { PlayerInput, PublicGameState } from "@/lib/game/types";

type GameArenaProps = {
  roomId: string;
  playerId: string;
  initialState: PublicGameState;
  onLeave: () => void;
};

export function GameArena({ roomId, playerId, initialState, onLeave }: GameArenaProps) {
  const [state, setState] = useState<PublicGameState>(initialState);
  const [error, setError] = useState("");
  const inputRef = useRef<PlayerInput>({
    up: false,
    down: false,
    left: false,
    right: false,
    angle: 0,
    shoot: false,
  });
  const shootLatchRef = useRef(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const sync = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/rooms/${roomId}/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId,
          input: { ...inputRef.current, shoot: shootLatchRef.current },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sync failed.");
      setState(data.state);
      shootLatchRef.current = false;
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection lost.");
    }
  }, [playerId, roomId]);

  useEffect(() => {
    const interval = window.setInterval(sync, 50);
    return () => window.clearInterval(interval);
  }, [sync]);

  useEffect(() => {
    const updateAngle = (event: MouseEvent) => {
      const wrap = canvasWrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const localX = ((event.clientX - rect.left) / rect.width) * state.width;
      const localY = ((event.clientY - rect.top) / rect.height) * state.height;
      const self = state.players.find((player) => player.id === playerId);
      if (!self) return;
      inputRef.current.angle = Math.atan2(localY - self.y, localX - self.x);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyW" || event.code === "ArrowUp") inputRef.current.up = true;
      if (event.code === "KeyS" || event.code === "ArrowDown") inputRef.current.down = true;
      if (event.code === "KeyA" || event.code === "ArrowLeft") inputRef.current.left = true;
      if (event.code === "KeyD" || event.code === "ArrowRight") inputRef.current.right = true;
      if (event.code === "Space") {
        event.preventDefault();
        shootLatchRef.current = true;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code === "KeyW" || event.code === "ArrowUp") inputRef.current.up = false;
      if (event.code === "KeyS" || event.code === "ArrowDown") inputRef.current.down = false;
      if (event.code === "KeyA" || event.code === "ArrowLeft") inputRef.current.left = false;
      if (event.code === "KeyD" || event.code === "ArrowRight") inputRef.current.right = false;
    };

    const onMouseDown = () => {
      shootLatchRef.current = true;
    };

    window.addEventListener("mousemove", updateAngle);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousemove", updateAngle);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [playerId, state.players, state.width, state.height]);

  const self = state.players.find((player) => player.id === playerId);
  const winner = state.players.find((player) => player.id === state.winnerId);

  const requestRematch = async () => {
    const response = await fetch(`/api/game/rooms/${roomId}/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId, rematch: true }),
    });
    const data = await response.json();
    if (response.ok) setState(data.state);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.28em] text-purple-light uppercase">Room {state.code}</p>
          <h2 className="font-magneto mt-1 text-2xl text-foreground">Laser Survival Arena</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
            {state.playerCount}/{state.maxPlayers} players
          </span>
          <span className="rounded-full border border-purple/25 bg-purple/10 px-3 py-1 text-xs text-purple-light uppercase">
            {state.status}
          </span>
          <button
            type="button"
            onClick={onLeave}
            className="rounded-full border border-white/15 px-4 py-2 text-xs text-muted transition hover:text-foreground"
          >
            Leave
          </button>
        </div>
      </div>

      <div ref={canvasWrapRef}>
        <GameCanvas state={state} playerId={playerId} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {state.players.map((player) => (
          <SpotlightCard key={player.id} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{player.name}</p>
                <p className="text-xs text-muted">{player.id === playerId ? "You" : "Opponent"}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-purple-light">{player.kills} kills</p>
                <p className={player.alive ? "text-emerald-400" : "text-red-400"}>
                  {player.alive ? "Alive" : "Eliminated"}
                </p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {state.status === "lobby" ? (
        <SpotlightCard className="p-5 text-sm text-muted">
          Waiting for players... share room code <span className="text-purple-light">{state.code}</span>{" "}
          with a friend. Match starts when at least 2 players join.
        </SpotlightCard>
      ) : null}

      {state.status === "finished" ? (
        <SpotlightCard className="space-y-4 p-6 text-center">
          <p className="text-xs tracking-[0.28em] text-purple-light uppercase">Match Over</p>
          <h3 className="font-magneto text-3xl text-foreground">
            {winner ? `${winner.name} survives!` : "Draw"}
          </h3>
          {self ? (
            <p className="text-sm text-muted">
              You finished with {self.kills} elimination{self.kills === 1 ? "" : "s"}.
            </p>
          ) : null}
          <button
            type="button"
            onClick={requestRematch}
            className="rounded-full bg-gradient-to-r from-purple to-purple-light px-6 py-3 text-sm font-medium text-white"
          >
            Rematch
          </button>
        </SpotlightCard>
      ) : null}

      {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
