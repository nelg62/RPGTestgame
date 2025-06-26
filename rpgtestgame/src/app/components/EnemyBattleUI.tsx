import Image from "next/image";
import { Character } from "../types/player";
import ProgressBar from "./ProgressBar";

interface Props {
  enemy: Character;
}

export default function EnemyBattleUI({ enemy }: Props) {
  return (
    <>
      <div className="border w-1/4 h-full">
        <h1 className="text-center p-3">{enemy.name}</h1>
        <div className="justify-center items-center flex">
          <Image
            src={enemy.image}
            alt="Enemy image"
            height={100}
            width={100}
            priority
          />
        </div>
        <ProgressBar
          label="Enemy HP"
          current={enemy.hp}
          max={enemy.maxHp}
          color="bg-red-500"
        />
      </div>
    </>
  );
}
