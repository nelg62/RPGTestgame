"use client";
import GameDisplay from "@/app/components/GameDisplay";
import ShopDisplay from "@/app/components/ShopDisplay";

export default function ShopPage() {
  return (
    <>
      {/* display room  */}
      <ShopDisplay />
      {/* display game */}
      <GameDisplay />
    </>
  );
}
