import { useGame } from "@/context/GameContext";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

export default function DisplayAllMonsters() {
  const { remainingEnemies, inCombat } = useGame();

  return (
    <div className="flex h-full w-full">
      {remainingEnemies.map((enemy) => (
        <div key={enemy.name} className="border w-1/4 h-9/10">
          {inCombat && (
            <div>
              {/* Enemy Name */}
              <h1 className="text-center p-3">{enemy?.name}</h1>
              {enemy && (
                <>
                  <div className="justify-center items-center flex">
                    {/* Enemy image */}

                    <Image
                      src={enemy?.image}
                      alt="Enemy image"
                      height={100}
                      width={100}
                      priority
                    />
                  </div>

                  {/* Enemy Health bar */}
                  <ProgressBar
                    label="Enemy HP"
                    current={enemy?.hp}
                    max={enemy?.maxHp}
                    color="bg-red-500"
                  />
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
