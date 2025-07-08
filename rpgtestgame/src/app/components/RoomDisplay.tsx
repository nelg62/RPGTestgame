import { useGame } from "@/context/GameContext";
import DisplayAllMonsters from "./DisplayAllMonsters";
import { useRouter } from "next/navigation";

export default function RoomDisplay() {
  const { setInCombat, resetGame, inCombat, enterDungeon } = useGame();

  const router = useRouter();

  return (
    <div className="h-1/2 w-full bg-black">
      <div className="w-full h-full max-w-[900px] mx-auto aspect-[2/1]">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Floor */}
          <polygon points="-200,500 700,500 500,300 0,300" fill="#666" />

          {/* Ceiling */}
          <polygon points="-200,0 700,0 500,150 0,150" fill="#333" />

          {/* Left Wall */}
          <polygon points="-200,0 -200,500 0,300 0,150" fill="#555" />

          {/* Right Wall */}
          <polygon points="700,0 700,500 500,300 500,150" fill="#555" />

          {/* Back Wall */}
          <rect x="0" y="150" width="500" height="150" fill="#444" />

          {/*Back Wall Door */}
          <rect
            x="220"
            y="200"
            width="60"
            height="100"
            fill="#222"
            stroke="#aaa"
            strokeWidth="2"
            rx="4"
          />

          {/* Left Door (angled perspective) */}
          <polygon
            points="-100,410 -80,390 -80,190 -100,170"
            fill="#222"
            stroke="#aaa"
            strokeWidth="2"
          />

          {/* Right Door (angled perspective) */}
          <polygon
            points="600,410 620,430 620,190 600,210"
            fill="#222"
            stroke="#aaa"
            strokeWidth="2"
          />

          {/* Front Door (facing viewer) */}
          <polygon
            points="230,500 270,500 260,470 240,470"
            fill="#222"
            stroke="#aaa"
            strokeWidth="2"
            rx="4"
          />
        </svg>
      </div>
    </div>

    // <div className="border h-1/2 flex">
    //   <div className="flex flex-col">
    //     <div className="">room display</div>
    //     <button
    //       onClick={() => setInCombat(true)}
    //       className="m-2 p-2 bg-blue-500 text-white rounded"
    //     >
    //       Battle Monster
    //     </button>
    //     <button
    //       onClick={() => resetGame()}
    //       className="m-2 p-2 bg-blue-500 text-white rounded"
    //     >
    //       Reset Game
    //     </button>
    //     <button
    //       onClick={() => enterDungeon()}
    //       className="m-2 p-2 bg-blue-500 text-white rounded"
    //     >
    //       Enter Dungeon
    //     </button>
    //     <button
    //       onClick={() => router.push("./shop")}
    //       className="m-2 p-2 bg-blue-500 text-white rounded"
    //     >
    //       Enter Shop
    //     </button>
    //   </div>
    //   {inCombat && <DisplayAllMonsters />}
    //   {/* {exploringDungeon && !inCombat && <RoomMap />} */}
    // </div>
  );
}
