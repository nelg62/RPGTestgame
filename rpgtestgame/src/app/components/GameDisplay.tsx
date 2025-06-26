"use client";
import useGameLogic from "../game/useGameLogic";
import BattleUI from "./BattleUI";
import EnemyBattleUI from "./EnemyBattleUI";
import PlayerBattleUI from "./PlayerBattleUI";

export default function GameDisplay() {
  const { player, currentEnemy, handlePlayerAttack } = useGameLogic();

  return (
    <div className="h-1/2 flex">
      {/* Player box */}
      <PlayerBattleUI player={player} />
      {/* Battle logic and buttons */}
      <BattleUI onAttack={handlePlayerAttack} />
      {/* Enemy Box */}
      <EnemyBattleUI enemy={currentEnemy} />
    </div>
  );
}
