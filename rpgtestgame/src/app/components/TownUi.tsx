import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";

export default function TownUi() {
  const { setInCombat, enterDungeon, resetGame } = useGame();
  const router = useRouter();

  return (
    <div className="w-full bg-sky-200">
      <div className="w-full h-full max-w-[900px] mx-auto aspect-[2/1] border">
        <svg
          viewBox="0 0 500 250"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Ground */}
          <rect x="0" y="200" width="500" height="50" fill="#4caf50" />

          {/* Road */}
          <rect x="220" y="70" width="50" height="180" fill="#555" />
          <rect x="220" y="60" width="210" height="50" fill="#555" />
          <rect x="80" y="60" width="200" height="50" fill="#555" />

          {/* House 1 */}
          <g onClick={() => resetGame()} className="cursor-pointer ">
            <rect x="50" y="140" width="60" height="60" fill="#d2691e" />
            <polygon points="50,140 80,110 110,140" fill="#8b4513" />
            <text x="80" y="170" fontSize="10" textAnchor="middle" fill="#000">
              Rest Game
            </text>
          </g>

          {/* House 2 */}
          <rect x="140" y="160" width="50" height="40" fill="#a0522d" />
          <polygon points="140,160 165,140 190,160" fill="#5e2c04" />

          {/* Tree */}
          <rect x="300" y="170" width="10" height="30" fill="#8b5e3c" />
          <circle cx="305" cy="160" r="20" fill="#2e8b57" />

          {/* Town center (market square) */}
          <g onClick={() => router.push("./shop")} className="cursor-pointer ">
            <rect x="350" y="120" width="100" height="80" fill="#f0e68c" />
            <text x="400" y="165" fontSize="10" textAnchor="middle" fill="#000">
              Enter Shop
            </text>
          </g>

          {/* Cave (Dark rocky entrance) */}
          <g onClick={() => setInCombat(true)} className="cursor-pointer ">
            <ellipse cx="100" cy="60" rx="40" ry="30" fill="#3e3e3e" />
            <ellipse cx="100" cy="65" rx="20" ry="15" fill="#1a1a1a" />
            <text x="100" y="25" fontSize="10" textAnchor="middle" fill="#000">
              Cave Enter Combat
            </text>
          </g>

          {/* Dungeon (Stone building with iron gate) */}
          <g onClick={() => enterDungeon()} className="cursor-pointer ">
            <rect x="370" y="30" width="60" height="50" fill="#999" />
            <rect x="390" y="50" width="20" height="30" fill="#333" />
            <line
              x1="390"
              y1="50"
              x2="390"
              y2="80"
              stroke="#777"
              strokeWidth="2"
            />
            <line
              x1="400"
              y1="50"
              x2="400"
              y2="80"
              stroke="#777"
              strokeWidth="2"
            />
            <line
              x1="410"
              y1="50"
              x2="410"
              y2="80"
              stroke="#777"
              strokeWidth="2"
            />
            <text x="400" y="25" fontSize="10" textAnchor="middle" fill="#000">
              Enter Dungeon
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
