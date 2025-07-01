import { useGame } from "@/context/GameContext";
import DisplayAllMonsters from "./DisplayAllMonsters";
import RoomMap from "./RoomMap";

export default function RoomDisplay() {
  const { setInCombat, resetGame, inCombat, exploringDungeon, enterDungeon } =
    useGame();

  return (
    <div className="border h-1/2 flex">
      <div className="flex flex-col">
        <div className="">room display</div>
        <button onClick={() => setInCombat(true)}>Battle Monster</button>
        <button onClick={() => resetGame()}>Reset Game</button>
        <button onClick={() => enterDungeon()}>Enter Dungeon</button>
      </div>
      {inCombat && <DisplayAllMonsters />}
      {exploringDungeon && !inCombat && <RoomMap />}
    </div>
  );
}
