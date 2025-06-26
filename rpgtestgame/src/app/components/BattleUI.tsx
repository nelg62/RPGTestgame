interface Props {
  onAttack: () => void;
}

export default function BattleUI({ onAttack }: Props) {
  return (
    <>
      <div className="border w-1/2">
        {/* Attack Button */}
        <button
          onClick={onAttack}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          Attack
        </button>
      </div>
    </>
  );
}
