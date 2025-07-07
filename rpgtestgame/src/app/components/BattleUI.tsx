import { useGame } from "@/context/GameContext";
import TurnIndicator from "./TurnIndicator";
import { useRouter } from "next/navigation";

export default function BattleUI() {
  const {
    turn,
    handlePlayerAttack,
    log,
    inCombat,
    inventory,
    addToInventory,
    handleUseItem,
  } = useGame();
  console.log("inventory", inventory);

  const router = useRouter();

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
        <h3 className="mt-4 px-2"> Battle Log</h3>
        <ul className="m-2 text-sm text-black max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
        <button
          onClick={addToInventory}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Inventory
        </button>
        {inventory.length > 0 ? (
          <ul className="m-2 text-sm text-black max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
            {inventory.map((entry, index) => (
              <li key={index} onClick={() => handleUseItem(entry.name)}>
                {entry.name}
              </li>
            ))}
            {/* <li>{inventory[0].name}</li> */}
          </ul>
        ) : (
          ""
        )}
        <button
          onClick={() => router.push("./shop")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Shop
        </button>
      </div>
    </>
  );
}
