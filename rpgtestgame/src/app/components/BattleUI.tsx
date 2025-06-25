import { Character } from "../types/player";

interface Props {
  player: Character;
}

export default function BattleUI({ player }: Props) {
  return (
    <>
      <div className="border w-1/4 h-full">{player.hp}</div>
    </>
  );
}
