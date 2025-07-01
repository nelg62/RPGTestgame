"use client";
import { useGame } from "@/context/GameContext";
import BattleUI from "./BattleUI";
import EnemyBattleUI from "./EnemyBattleUI";
import PlayerBattleUI from "./PlayerBattleUI";
import RoomMap from "./RoomMap";

export default function GameDisplay() {
  const { inCombat, exploringDungeon } = useGame();
  return (
    <div className="h-1/2 flex">
      {/* Player box */}
      <PlayerBattleUI />
      {/* Battle logic and buttons */}
      <BattleUI />

      {/* Enemy Box */}

      {inCombat && <EnemyBattleUI />}
      {!inCombat && exploringDungeon && <RoomMap />}
    </div>
  );
}
