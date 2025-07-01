import { useGame } from "@/context/GameContext";
import { MAP_WIDTH } from "../utils/generateMap";

export default function RoomMap() {
  const { map, currentRoomIndex, enterRoom } = useGame();
  return (
    <div className="w-1/4 content-center">
      <h2 className="text-center">Room {currentRoomIndex + 1}</h2>
      <p className="text-center">
        Type:{" "}
        {
          {
            start: "Start",
            enemy: "Enemy",
            treasure: "Treasure",
            healing: "Healing",
            empty: "Empty",
            boss: "Boss",
          }[map[currentRoomIndex].type]
        }
      </p>

      <h3 className="text-center">🗺️ Dungeon Map</h3>

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
            <button key={room.id} onClick={() => enterRoom(i)}>
              {room.type === "start" ? "🚪" : ""}
              {room.type === "enemy" && !room.visited ? "👹" : ""}
              {room.type === "treasure" ? "💰" : ""}
              {room.type === "healing" ? "💖" : ""}
              {room.type === "empty" ? "🌾" : ""}
              {room.type === "boss" ? "👑" : ""}
              <br />
              Room {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
