"use client";
import useGameLogic from "../game/useGameLogic";
import PlayerBattleUI from "./PlayerBattleUI";

export default function GameDisplay() {
  const { player } = useGameLogic();

  return (
    <div className="h-1/2 flex">
      <PlayerBattleUI player={player} />
      {/* <BattleUI player={player} /> */}
    </div>
  );
}
