import { useGame } from "@/context/GameContext";
import DisplayAllMonsters from "./DisplayAllMonsters";
import { useRouter } from "next/navigation";
import RoomUi from "./RoomUi";

export default function RoomDisplay() {
  const { setInCombat, resetGame, inCombat, enterDungeon, exploringDungeon } =
    useGame();

  const router = useRouter();

  return (
    <>
      <div className="border h-1/2 flex">
        <div className="flex flex-col">
          <div className="">room display</div>
          <button
            onClick={() => setInCombat(true)}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            Battle Monster
          </button>
          <button
            onClick={() => resetGame()}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            Reset Game
          </button>
          <button
            onClick={() => enterDungeon()}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            Enter Dungeon
          </button>
          <button
            onClick={() => router.push("./shop")}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            Enter Shop
          </button>
        </div>

        {inCombat && <DisplayAllMonsters />}
        {exploringDungeon && !inCombat && <RoomUi />}
        {/* {exploringDungeon && !inCombat && <RoomMap />} */}
      </div>
    </>
  );
}
