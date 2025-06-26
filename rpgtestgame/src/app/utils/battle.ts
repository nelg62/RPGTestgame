import { Character } from "../types/player";

export function attack(
  attacker: Character,
  target: Character
): { updatedTarget: Character; message: string } {
  const roll = Math.random();
  let damage = attacker.attack;
  let message = "";

  if (roll < 0.1) {
    damage = 0;
    message = `${attacker.name} missed!`;
  } else if (roll > 0.9) {
    damage *= 2;
    message = `Critical hit! ${attacker.name} dealt ${damage} damage!`;
  } else {
    message = `${attacker.name} dealt ${damage} damage.`;
  }

  const updatedTarget = {
    ...target,
    hp: Math.max(0, target.hp - damage),
  };

  return { updatedTarget, message };
}
