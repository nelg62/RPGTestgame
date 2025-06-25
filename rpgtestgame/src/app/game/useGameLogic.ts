import { useState } from "react";
import { Character } from "../types/player";

export default function useGameLogic() {
  const [player, setPlayer] = useState<Character>({
    name: "Hero",
    hp: 100,
    maxHp: 100,
    attack: 10,
  });

  return { player };
}
