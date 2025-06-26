interface Props {
  onAttack: () => void;
  log: string[];
}

export default function BattleUI({ onAttack, log }: Props) {
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

        <h3 className="mt-4"> Battle Log</h3>
        <ul className="text-sm text-black max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
