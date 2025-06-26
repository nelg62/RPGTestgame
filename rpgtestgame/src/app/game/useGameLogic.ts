import { useState } from "react";
import { Character } from "../types/player";

export default function useGameLogic() {
  const [player, setPlayer] = useState<Character>({
    name: "Hero",
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: "/user.png",
  });

  const [enemies, setEnemies] = useState<Character[]>([
    { name: "Bat", hp: 25, maxHp: 25, attack: 4, image: "/user.png" },
    { name: "Zombie", hp: 35, maxHp: 35, attack: 6, image: "/user.png" },
    { name: "Skeleton", hp: 40, maxHp: 40, attack: 7, image: "/user.png" },
  ]);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const currentEnemy = enemies[currentEnemyIndex];
  return { player, currentEnemy };
}
