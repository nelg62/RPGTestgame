import { useGame } from "@/context/GameContext";
import DisplayAllMonsters from "./DisplayAllMonsters";
import { useRouter } from "next/navigation";

export default function ShopDisplay() {
  const { inCombat, handleBuyItem } = useGame();

  const router = useRouter();

  return (
    <div className="border h-1/2 flex">
      <div className="flex flex-col">
        <div className="">Welcome to the Shop</div>
        <button
          onClick={() => router.push("./game")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Back to game
        </button>
        <button
          onClick={() => handleBuyItem("potion")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Buy Potion
        </button>
        {/* <button
          onClick={() => enterDungeon()}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Enter Dungeon
        </button> */}
      </div>
      {inCombat && <DisplayAllMonsters />}
      {/* {exploringDungeon && !inCombat && <RoomMap />} */}
    </div>
  );
}
