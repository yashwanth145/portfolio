"use client";

import { useEffect, useRef } from "react";

import type { PublicGameState } from "@/lib/game/types";
import { OBSTACLE_FADE_MS, PLAYER_RADIUS, type Laser } from "@/lib/game/types";

type GameCanvasProps = {
  state: PublicGameState;
  playerId: string;
};

function drawLaser(ctx: CanvasRenderingContext2D, laser: Laser) {
  const points = laser.trail?.length ? laser.trail : [{ x: laser.x, y: laser.y }];
  const head = points[points.length - 1];
  const tail = points[0];

  if (points.length >= 2) {
    const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
    gradient.addColorStop(0, "rgba(40, 8, 8, 0)");
    gradient.addColorStop(0.25, "rgba(91, 20, 20, 0.45)");
    gradient.addColorStop(0.55, "rgba(107, 33, 82, 0.75)");
    gradient.addColorStop(0.8, "rgba(76, 29, 149, 0.9)");
    gradient.addColorStop(1, "rgba(88, 28, 135, 1)");

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    ctx.shadowColor = "rgba(76, 29, 149, 0.55)";
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(127, 29, 29, 0.85)";
    ctx.stroke();
    ctx.restore();
  }

  const headGradient = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
  headGradient.addColorStop(0, "rgba(190, 80, 120, 0.95)");
  headGradient.addColorStop(0.35, "rgba(107, 33, 168, 0.85)");
  headGradient.addColorStop(0.7, "rgba(76, 29, 149, 0.45)");
  headGradient.addColorStop(1, "rgba(40, 8, 8, 0)");
  ctx.fillStyle = headGradient;
  ctx.beginPath();
  ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
  ctx.fill();
}

export function GameCanvas({ state, playerId }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = state.width * dpr;
    canvas.height = state.height * dpr;
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < state.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, state.height);
      ctx.stroke();
    }
    for (let y = 0; y < state.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(state.width, y);
      ctx.stroke();
    }

    const now = Date.now();

    for (const rock of state.obstacles) {
      let alpha = 1;
      if (rock.expiresAt) {
        const timeLeft = rock.expiresAt - now;
        alpha = Math.max(0, Math.min(1, timeLeft / OBSTACLE_FADE_MS));
        if (alpha <= 0) continue;
      }

      const gradient = ctx.createRadialGradient(rock.x - rock.r * 0.3, rock.y - rock.r * 0.3, 0, rock.x, rock.y, rock.r);
      gradient.addColorStop(0, `rgba(76, 61, 99, ${alpha})`);
      gradient.addColorStop(0.55, `rgba(42, 34, 56, ${alpha})`);
      gradient.addColorStop(1, `rgba(21, 16, 31, ${alpha})`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(rock.x, rock.y, rock.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(192, 132, 252, ${0.18 * alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    for (const laser of state.lasers) {
      drawLaser(ctx, laser);
    }

    for (const player of state.players) {
      if (!player.alive && state.status === "playing") continue;

      const isSelf = player.id === playerId;
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.angle);

      ctx.fillStyle = isSelf ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.arc(0, 0, PLAYER_RADIUS + 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.arc(0, 0, PLAYER_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.fillRect(PLAYER_RADIUS - 2, -3, 14, 6);

      ctx.restore();

      ctx.fillStyle = "#f4f4f5";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(player.name, player.x, player.y - PLAYER_RADIUS - 12);
    }

    if (state.status === "countdown" && state.countdown > 0) {
      ctx.fillStyle = "rgba(3,3,3,0.55)";
      ctx.fillRect(0, 0, state.width, state.height);
      ctx.fillStyle = "#f4f4f5";
      ctx.font = "bold 72px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(Math.ceil(state.countdown)), state.width / 2, state.height / 2 + 24);
    }
  }, [playerId, state]);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.12)]">
      <canvas ref={canvasRef} className="block max-w-full bg-[#050505]" />
    </div>
  );
}
