import { NextResponse } from "next/server";

import { applyPlayerInput, tickRoom } from "@/lib/game/engine";
import { getRoom, pruneStaleRooms, resetRoomForRematch, toPublicState } from "@/lib/game/store";
import type { PlayerInput } from "@/lib/game/types";

type SyncBody = {
  playerId?: string;
  input?: PlayerInput;
  rematch?: boolean;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> },
) {
  pruneStaleRooms();
  const { roomId } = await params;
  const room = getRoom(roomId);

  if (!room) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }

  const body = (await request.json()) as SyncBody;
  const playerId = body.playerId;

  if (!playerId || !room.players[playerId]) {
    return NextResponse.json({ error: "Invalid player." }, { status: 400 });
  }

  if (body.rematch && room.status === "finished") {
    resetRoomForRematch(room);
  }

  const now = Date.now();
  if (body.input) {
    applyPlayerInput(room, playerId, body.input, now);
  }

  tickRoom(room, now);

  return NextResponse.json({ state: toPublicState(room) });
}
