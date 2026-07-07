import { NextResponse } from "next/server";

import { joinRoom, pruneStaleRooms, toPublicState } from "@/lib/game/store";

export async function POST(request: Request) {
  pruneStaleRooms();
  const body = (await request.json()) as { code?: string; playerName?: string };
  const code = body.code?.trim().toUpperCase();
  const playerName = body.playerName?.trim() || "Player";

  if (!code) {
    return NextResponse.json({ error: "Room code is required." }, { status: 400 });
  }

  const result = joinRoom(code, playerName);
  if (!result) {
    return NextResponse.json({ error: "Room not found or already started." }, { status: 404 });
  }

  return NextResponse.json({
    roomId: result.room.id,
    code: result.room.code,
    playerId: result.playerId,
    state: toPublicState(result.room),
  });
}
