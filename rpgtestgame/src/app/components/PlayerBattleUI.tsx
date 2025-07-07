import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { useGame } from "@/context/GameContext";

export default function PlayerBattleUI() {
  const { player } = useGame();

  return (
    <>
      <div className="border w-1/4 h-full">
        {/* Player name */}
        <h1 className="text-center p-3">{player.name}</h1>
        <div className="justify-center items-center flex">
          {/* Player image */}
          <Image
            src={player.image}
            alt="Hero image"
            height={100}
            width={100}
            priority
          />
        </div>
        {/* player health bar  */}
        <ProgressBar
          label="Player HP"
          current={player.hp}
          max={player.maxHp}
          color="bg-green-500"
        />
        <p>Gold: {player.gold}</p>
      </div>
    </>
  );
}
