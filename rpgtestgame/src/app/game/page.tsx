"use client";
import GameDisplay from "@/app/components/GameDisplay";
import RoomDisplay from "@/app/components/RoomDisplay";

export default function GamePage() {
  return (
    <>
      <div className="h-screen flex flex-col">
        {/* display room  */}
        <RoomDisplay />

        {/* display game */}
        <GameDisplay />
      </div>
    </>
  );
}
