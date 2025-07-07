"use client";
import GameDisplay from "@/app/components/GameDisplay";
import ShopDisplay from "@/app/components/ShopDisplay";
import { GameProvider } from "@/context/GameContext";

export default function ShopPage() {
  return (
    <>
      <GameProvider>
        {/* display room  */}
        <ShopDisplay />
        {/* display game */}
        <GameDisplay />
      </GameProvider>
    </>
  );
}
