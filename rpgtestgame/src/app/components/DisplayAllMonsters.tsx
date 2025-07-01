import { useGame } from "@/context/GameContext";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

export default function DisplayAllMonsters() {
  const {
    remainingEnemies,
    inCombat,
    currentEnemy,
    setCurrentEnemy,
    attackingEnemy,
    turn,
  } = useGame();

  return (
    <div className="flex h-full w-full">
      {remainingEnemies.map((enemy) => (
        <div key={enemy.name} className="w-1/4">
          {inCombat && (
            <div
              onClick={() => setCurrentEnemy(enemy)}
              className={`border h-full ${
                turn == "player"
                  ? currentEnemy?.name === enemy?.name
                    ? "border-red-500 bg-red-100 text-black"
                    : ""
                  : attackingEnemy?.name === enemy.name
                  ? "border-yellow-500 bg-yellow-100 animate-pulse"
                  : ""
              }`}
            >
              {/* Enemy Name */}
              <h1 className="text-center p-3">{enemy?.name}</h1>
              {enemy && (
                <>
                  <div className="justify-center items-center flex ">
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
