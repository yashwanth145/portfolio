import { NextResponse } from "next/server";

import { createRoom, pruneStaleRooms, toPublicState } from "@/lib/game/store";

export async function POST(request: Request) {
  pruneStaleRooms();
  const body = (await request.json()) as { playerName?: string };
  const playerName = body.playerName?.trim() || "Player";

  const { room, playerId } = createRoom(playerName);

  return NextResponse.json({
    roomId: room.id,
    code: room.code,
    playerId,
    state: toPublicState(room),
  });
}
