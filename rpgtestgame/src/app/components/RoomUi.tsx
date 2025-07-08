import { useGame } from "@/context/GameContext";
import { MAP_WIDTH } from "../utils/generateMap";

export default function RoomUi() {
  const { map, currentRoomIndex, moveToRoom } = useGame();
  const room = map[currentRoomIndex];

  console.log("room", room);
  console.log("connections", map[currentRoomIndex].connections);

  const { top, right, bottom, left } = room.walls || {};
  const maxIndex = map.length - 1;

  const topRoom =
    !top && currentRoomIndex - MAP_WIDTH >= 0
      ? currentRoomIndex - MAP_WIDTH
      : null;
  const bottomRoom =
    !bottom && currentRoomIndex + MAP_WIDTH <= maxIndex
      ? currentRoomIndex + MAP_WIDTH
      : null;
  const leftRoom =
    !left && currentRoomIndex % MAP_WIDTH !== 0 // not in leftmost column
      ? currentRoomIndex - 1
      : null;
  const rightRoom =
    !right && (currentRoomIndex + 1) % MAP_WIDTH !== 0 // not in rightmost column
      ? currentRoomIndex + 1
      : null;

  return (
    <div className="w-full bg-black">
      <div className="w-full h-full max-w-[900px] mx-auto aspect-[2/1]">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern
              id="dungeon-texture"
              patternUnits="objectBoundingBox"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href="/Texturelabs_Brick_141S.jpg"
                preserveAspectRatio="xMidYMid slice"
                width="1"
                height="1"
              />
            </pattern>
            <pattern
              id="dungeon-floor-texture"
              patternUnits="objectBoundingBox"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href="/360_F_242204753_XVb0wZ5RY2yagALVIcsU4jKK91WPJsyg.jpg"
                preserveAspectRatio="xMidYMid slice"
                width="1"
                height="1"
              />
            </pattern>
            <pattern
              id="dungeon-roof-texture"
              patternUnits="objectBoundingBox"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href="/images.jpg"
                preserveAspectRatio="xMidYMid slice"
                width="1"
                height="1"
              />
            </pattern>
          </defs>
          {/* Floor */}
          <polygon
            points="-200,500 700,500 500,300 0,300"
            fill="url(#dungeon-floor-texture)"
          />

          {/* Ceiling */}
          <polygon points="-200,0 700,0 500,150 0,150" fill="#333" />

          {/* Left Wall */}
          <polygon
            points="-200,0 -200,500 0,300 0,150"
            fill="url(#dungeon-texture)"
            stroke="#000"
            strokeWidth="2"
          />

          {/* Right Wall */}
          <polygon
            points="700,0 700,500 500,300 500,150"
            fill="url(#dungeon-texture)"
            stroke="#000"
            strokeWidth="2"
          />

          {/* Back Wall */}
          <rect
            x="0"
            y="150"
            width="500"
            height="150"
            fill="url(#dungeon-texture)"
            stroke="#000"
            strokeWidth="2"
          />

          {/*Back Wall Door */}
          {!top && (
            <g onClick={() => moveToRoom(topRoom)} className="cursor-pointer ">
              <rect
                x="220"
                y="200"
                width="60"
                height="100"
                fill="#222"
                stroke="#aaa"
                strokeWidth="2"
                rx="4"
                className={`${
                  map[topRoom].type === "enemy" ? "stroke-red-500" : ""
                }
                ${map[topRoom].type === "treasure" ? "stroke-yellow-500" : ""}`}
              />
              <text
                x="250"
                y="195"
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                className="pointer-events-none select-none"
              >
                Forward {map[topRoom].type}
              </text>
            </g>
          )}

          {/* Left Door (angled perspective) */}
          {!left && (
            <g onClick={() => moveToRoom(leftRoom)} className="cursor-pointer ">
              <polygon
                points="-100,410 -80,390 -80,190 -100,170"
                fill="#222"
                stroke="#aaa"
                strokeWidth="2"
                className={`${
                  map[leftRoom].type === "enemy" ? "stroke-red-500" : ""
                }${
                  map[leftRoom].type === "treasure" ? "stroke-yellow-500" : ""
                }`}
              />
              <text
                x="-100"
                y="160"
                fill="#fff"
                fontSize="12"
                className="pointer-events-none select-none"
              >
                Left {map[leftRoom].type}
              </text>
            </g>
          )}

          {/* Right Door (angled perspective) */}
          {!right && (
            <g
              onClick={() => moveToRoom(rightRoom)}
              className="cursor-pointer "
            >
              <polygon
                points="600,410 620,430 620,190 600,210"
                fill="#222"
                stroke="#aaa"
                strokeWidth="2"
                className={`${
                  map[rightRoom].type === "enemy" ? "stroke-red-500" : ""
                }${
                  map[rightRoom].type === "treasure" ? "stroke-yellow-500" : ""
                }`}
              />
              <text
                x="600"
                y="180"
                fill="#fff"
                fontSize="12"
                className="pointer-events-none select-none"
              >
                Right {map[rightRoom].type}
              </text>
            </g>
          )}

          {/* Front Door (facing viewer) */}
          {!bottom && (
            <g
              onClick={() => moveToRoom(bottomRoom)}
              className="cursor-pointer "
            >
              <polygon
                points="230,500 270,500 260,470 240,470"
                fill="#222"
                stroke="#aaa"
                strokeWidth="2"
                rx="4"
                className={`${
                  map[bottomRoom].type === "enemy" ? "stroke-red-500" : ""
                }${
                  map[bottomRoom].type === "treasure" ? "stroke-yellow-500" : ""
                }`}
              />

              <text
                x="250"
                y="465"
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                className="pointer-events-none select-none"
              >
                Exit {map[bottomRoom].type}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
