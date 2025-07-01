import { useGame } from "@/context/GameContext";
import { MAP_WIDTH } from "../utils/generateMap";

export default function RoomMap() {
  const { map, currentRoomIndex, enterRoom, roomLocked, player, turn } =
    useGame();
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
          const isCurrent = i === currentRoomIndex;

          return (
            <button
              key={room.id}
              disabled={
                isCurrent || player.hp <= 0 || turn !== "player" || roomLocked
              }
              onClick={() => enterRoom(i)}
              className={`p-2 border text-xs ${
                isCurrent
                  ? "bg-yellow-300 text-black"
                  : room.visited
                  ? "bg-green-200 text-black"
                  : "bg-gray-300 text-black"
              }`}
            >
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
