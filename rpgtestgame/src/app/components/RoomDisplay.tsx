import { useGame } from "@/context/GameContext";
import DisplayAllMonsters from "./DisplayAllMonsters";

export default function RoomDisplay() {
  const { setInCombat, resetGame } = useGame();

  return (
    <div className="border h-1/2 flex">
      <div className="flex flex-col">
        <div className="">room display</div>
        <button onClick={() => setInCombat(true)}>Battle Monster</button>
        <button onClick={() => resetGame()}>Reset Game</button>
      </div>
      <DisplayAllMonsters />
    </div>
  );
}
