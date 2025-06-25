"use client";
import useGameLogic from "../game/useGameLogic";
import BattleUI from "./BattleUI";

export default function GameDisplay() {
  const { player } = useGameLogic();

  return (
    <div className="h-1/2 flex">
      <BattleUI player={player} />
      {/* <BattleUI player={player} /> */}
    </div>
  );
}
