import { useGame } from "@/context/GameContext";
import { MAP_WIDTH } from "../utils/generateMap";

export default function RoomMap() {
  const { map } = useGame();
  return (
    <div className="w-full content-center">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${MAP_WIDTH}, 1fr)`,
          gap: "10px",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        {map.map((room, i) => {
          return (
            <button key={room.id}>
              {room.type} Room {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
