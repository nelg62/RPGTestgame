import { useState } from "react";
import { Character } from "../types/player";
import { attack } from "../utils/battle";

type Turn = "player" | "monster";

export default function useGameLogic() {
  // state for the player
  const [player, setPlayer] = useState<Character>({
    name: "Hero",
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: "/user.png",
  });

  // state for ememies
  const [enemies, setEnemies] = useState<Character[]>([
    { name: "Bat", hp: 25, maxHp: 25, attack: 4, image: "/user.png" },
    { name: "Zombie", hp: 35, maxHp: 35, attack: 6, image: "/user.png" },
    { name: "Skeleton", hp: 40, maxHp: 40, attack: 7, image: "/user.png" },
  ]);
  // set and index for the monsters in an array
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  // get the current monster by referancing the index to the monster array
  const currentEnemy = enemies[currentEnemyIndex];

  // control turns
  const [turn, setTurn] = useState<Turn>("player");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev]);
  };

  //  player attack logic
  const handlePlayerAttack = () => {
    if (turn !== "player" || !currentEnemy || player.hp <= 0) return;

    const { updatedTarget, message } = attack(player, currentEnemy);
    const newEnemies = [...enemies];
    newEnemies[currentEnemyIndex] = updatedTarget;
    setEnemies(newEnemies);
    addLog(message);

    if (updatedTarget.hp > 0) {
      setTurn("monster");
      setTimeout(() => {
        handleMonsterTurn(updatedTarget);
      }, 1000);
    } else {
      addLog(`✅ ${currentEnemy.name} was defeated!`);

      if (currentEnemyIndex + 1 < enemies.length) {
        setCurrentEnemyIndex((i) => i + 1);
        setTurn("player");
      } else {
        addLog("🎉 You defeated all the enemies!");
      }
    }
  };

  const handleMonsterTurn = (enemy: Character) => {
    const { updatedTarget, message } = attack(enemy, player);
    setPlayer(updatedTarget);
    addLog(message);

    if (updatedTarget.hp > 0) {
      setTurn("player");
    }
  };

  return { player, currentEnemy, handlePlayerAttack, log };
}
