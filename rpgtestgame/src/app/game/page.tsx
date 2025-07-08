"use client";
import GameDisplay from "@/app/components/GameDisplay";
import RoomDisplay from "@/app/components/RoomDisplay";

export default function GamePage() {
  return (
    <>
      {/* display room  */}
      <RoomDisplay />
      {/* display game */}
      <GameDisplay />
    </>
  );
}
