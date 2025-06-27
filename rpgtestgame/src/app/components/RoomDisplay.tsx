import { useGame } from "@/context/GameContext";

export default function RoomDisplay() {
  const { setInCombat } = useGame();

  return (
    <div className="border h-1/2">
      <div className="">room display</div>
      <button onClick={() => setInCombat(true)}>Battle Monster</button>
    </div>
  );
}
