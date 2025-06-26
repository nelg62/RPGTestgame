import GameDisplay from "../components/GameDisplay";
import RoomDisplay from "../components/RoomDisplay";

export default function GamePage() {
  return (
    <>
      {/* display room  */}
      <RoomDisplay />
      {/* display game */}
      <GameDisplay />
    </>
  );
}
