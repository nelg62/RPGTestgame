interface Props {
  turn: string;
}

export default function TurnIndicator({ turn }: Props) {
  return (
    <div className="my-4 text-center">
      <h2
        className={`text-xl font-bold ${
          turn === "player" ? "text-green-600" : "text-red-600"
        }`}
      >
        {turn === "player" ? "Your Turn" : "Enemy's Turn"}
      </h2>
    </div>
  );
}
