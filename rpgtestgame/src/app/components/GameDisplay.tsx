"use client";
import useGameLogic from "../game/useGameLogic";
import EnemyBattleUI from "./EnemyBattleUI";
import PlayerBattleUI from "./PlayerBattleUI";

export default function GameDisplay() {
  const { player, currentEnemy } = useGameLogic();

  return (
    <div className="h-1/2 flex">
      <PlayerBattleUI player={player} />
      <EnemyBattleUI enemy={currentEnemy} />
    </div>
  );
}
