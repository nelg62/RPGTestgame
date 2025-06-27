"use client";
import BattleUI from "./BattleUI";
import EnemyBattleUI from "./EnemyBattleUI";
import PlayerBattleUI from "./PlayerBattleUI";

export default function GameDisplay() {
  return (
    <div className="h-1/2 flex">
      {/* Player box */}
      <PlayerBattleUI />
      {/* Battle logic and buttons */}
      <BattleUI />
      {/* Enemy Box */}
      <EnemyBattleUI />
    </div>
  );
}
