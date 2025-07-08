import { useGame } from "@/context/GameContext";
import TurnIndicator from "./TurnIndicator";
// import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BattleUI() {
  const {
    turn,
    handlePlayerAttack,
    log,
    inCombat,
    inventory,
    // addToInventory,
    handleUseItem,
  } = useGame();
  // console.log("inventory", inventory);
  const [showInventory, setShowInventory] = useState(true);
  const [showBattleLog, setShowBattleLog] = useState(true);

  const handleShowInventory = () => {
    return showInventory ? setShowInventory(false) : setShowInventory(true);
  };

  const handleShowBattleLog = () => {
    return showBattleLog ? setShowBattleLog(false) : setShowBattleLog(true);
  };

  // const router = useRouter();

  return (
    <>
      <div className="border w-1/2">
        {inCombat && (
          <>
            <TurnIndicator />

            {/* Attack Button */}
            <button
              onClick={handlePlayerAttack}
              className="m-2 p-2 bg-blue-500 text-white rounded"
              disabled={turn !== "player"}
            >
              Attack
            </button>
          </>
        )}

        <button
          onClick={handleShowBattleLog}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          {showBattleLog ? "Hide Battle Log" : "Show Battle Log"}
        </button>
        <button
          onClick={handleShowInventory}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          {showInventory ? "Hide Inventory" : "Show Inventory"}
        </button>
        {/* <button
          onClick={() => router.push("./shop")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Shop
        </button> */}

        {inventory.length > 0 && showInventory ? (
          <>
            <h3 className="mt-4 px-2">Inventory</h3>
            <ul className="grid grid-cols-4 m-2 text-sm text-black max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
              {inventory.map((entry, index) => (
                <li key={index} onClick={() => handleUseItem(entry.name)}>
                  🧪{entry.name}
                </li>
              ))}
              {/* <li>{inventory[0].name}</li> */}
            </ul>
          </>
        ) : (
          ""
        )}

        {showBattleLog ? (
          <>
            <h3 className="mt-4 px-2"> Battle Log</h3>
            <ul className="m-2 text-sm text-black max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
              {log.map((entry, index) => (
                <li
                  key={index}
                  className={`border-y ${
                    entry.includes("attacks")
                      ? "text-right bg-red-200"
                      : "text-left"
                  } ${entry.includes("defeated!") ? "bg-green-200" : ""} ${
                    entry.includes("Gold") ? "bg-yellow-200" : ""
                  }`}
                >
                  {entry}
                </li>
              ))}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
