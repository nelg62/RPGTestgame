import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { useGame } from "@/context/GameContext";

export default function EnemyBattleUI() {
  const { inCombat, currentEnemy } = useGame();

  return (
    <>
      {inCombat && (
        <div className="border w-1/4 h-full">
          {/* Enemy Name */}
          <h1 className="text-center p-3">{currentEnemy?.name}</h1>
          {currentEnemy && (
            <>
              <div className="justify-center items-center flex">
                {/* Enemy image */}

                <Image
                  src={currentEnemy?.image}
                  alt="Enemy image"
                  height={100}
                  width={100}
                  priority
                />
              </div>

              {/* Enemy Health bar */}
              <ProgressBar
                label="Enemy HP"
                current={currentEnemy?.hp}
                max={currentEnemy?.maxHp}
                color="bg-red-500"
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
