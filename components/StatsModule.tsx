export const StatsModule = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div className="flex flex-col justify-center items-center mr-2">
      <div className="stats-module-value">{value}</div>
      <div className="stats-module-label">{label}</div>{" "}
    </div>
  );
};
