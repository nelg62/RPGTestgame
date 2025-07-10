import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";

export default function ShopUi() {
  const { handleBuyItem } = useGame();

  const router = useRouter();

  return (
    <div className="w-full bg-sky-200">
      <div className="w-full h-full max-w-[900px] mx-auto aspect-[2/1] border">
        <svg
          viewBox="0 0 500 250"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Shop background */}
          <rect x="0" y="0" width="500" height="250" fill="#ffe4b5" />

          {/* Counter */}
          <rect x="100" y="160" width="300" height="30" fill="#8b4513" />
          <text x="250" y="178" textAnchor="middle" fill="#fff">
            {/* Counter */}
          </text>

          {/* Shopkeeper */}
          <circle cx="250" cy="150" r="15" fill="#f2c98a" />
          <text x="250" y="115" textAnchor="middle" dy="0.35em" fontSize="100">
            🧙
          </text>

          {/* Cabinet */}
          <rect
            x="30"
            y="40"
            width="120"
            height="100"
            fill="#deb887"
            stroke="#8b5a2b"
          />
          <text x="90" y="55" textAnchor="middle" fontSize="12" fill="#000">
            Items
          </text>

          {/* Cabinet shelves with clickable items */}
          <g onClick={() => handleBuyItem("potion")} cursor="pointer">
            <rect
              x="50"
              y="65"
              width="30"
              height="30"
              fill="#e0f7fa"
              stroke="#00796b"
            />
            <text
              x="65"
              y="85"
              textAnchor="middle"
              fontSize="12"
              fill="#00796b"
            >
              🧪
            </text>
            <text x="65" y="105" textAnchor="middle" fontSize="10">
              Potion $50
            </text>
          </g>

          {/* more items later? */}
          {/* <g onClick={() => alert("No item implemented")} cursor="pointer">
            <rect
              x="90"
              y="65"
              width="30"
              height="30"
              fill="#ffe082"
              stroke="#f57f17"
            />
            <text
              x="105"
              y="85"
              textAnchor="middle"
              fontSize="12"
              fill="#6d4c41"
            >
              🧤
            </text>
            <text x="105" y="100" textAnchor="middle" fontSize="10">
              Gloves
            </text>
          </g> */}

          {/* Door to leave the shop */}
          <g onClick={() => router.push("./game")} cursor="pointer">
            <rect
              x="420"
              y="120"
              width="50"
              height="80"
              fill="#654321"
              stroke="#3e2723"
            />
            <circle cx="460" cy="160" r="3" fill="#fff" />
            <text x="425" y="115" textAnchor="middle" fontSize="12" fill="#000">
              🚪 Leave Back to Town
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
