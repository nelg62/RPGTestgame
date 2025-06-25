interface ProgressBarProps {
  label: string;
  current: number;
  max: number;
  color: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  current,
  max,
  color,
}) => {
  const percentage = (current / max) * 100;

  return (
    <div className="mb-2 p-2">
      <div className="flex justify-between mb-1 text-sm font-semibold">
        <span>{label}</span>
        <span>
          {current} / {max}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-300 rounded">
        <div
          className={`h-full rounded ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
