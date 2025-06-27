"use client";
import { GameProvider } from "@/context/GameContext";
import GameDisplay from "../components/GameDisplay";
import RoomDisplay from "../components/RoomDisplay";

export default function GamePage() {
  return (
    <>
      <GameProvider>
        {/* display room  */}
        <RoomDisplay />
        {/* display game */}
        <GameDisplay />
      </GameProvider>
    </>
  );
}
