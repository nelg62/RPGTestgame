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
    exploringDungeon,
  } = useGame();

  return (
    <div className="flex h-full w-full">
      {exploringDungeon && inCombat && (
        <div key={currentEnemy?.name} className="w-1/4">
          {inCombat && (
            <div
              // onClick={() => setCurrentEnemy(attackingEnemy)}
              className={`border h-full ${
                turn == "player"
                  ? currentEnemy?.name === currentEnemy?.name
                    ? "border-red-500 bg-red-100 text-black"
                    : ""
                  : currentEnemy?.name === currentEnemy?.name
                  ? "border-yellow-500 bg-yellow-100 animate-pulse"
                  : ""
              }`}
            >
              {/* Enemy Name */}
              <h1 className="text-center p-3">{currentEnemy?.name}</h1>
              {currentEnemy && (
                <>
                  <div className="justify-center items-center flex ">
                    {/* Enemy image */}

                    <Image
                      src={currentEnemy?.image}
                      alt="Enemy image"
                      height={100}
                      width={100}
                      priority
                      className="h-auto w-auto"
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
        </div>
      )}

      {!exploringDungeon && inCombat && (
        <div className="flex h-full w-full">
          {" "}
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
                  {attackingEnemy?.name === enemy.name ? (
                    <div className="justify-center items-center flex">
                      <Image
                        src={"/download.png"}
                        alt="Enemy image"
                        height={100}
                        width={100}
                        priority
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
