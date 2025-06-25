import Image from "next/image";
import { Character } from "../types/player";
import ProgressBar from "./ProgressBar";

interface Props {
  player: Character;
}

export default function PlayerBattleUI({ player }: Props) {
  return (
    <>
      <div className="border w-1/4 h-full">
        <h1 className="text-center p-3">{player.name}</h1>
        <div className="justify-center items-center flex">
          <Image
            src={player.image}
            alt="Hero image"
            height={100}
            width={100}
            priority
          />
        </div>
        <ProgressBar
          label="Player HP"
          current={player.hp}
          max={player.maxHp}
          color="bg-green-500"
        />
      </div>
    </>
  );
}
