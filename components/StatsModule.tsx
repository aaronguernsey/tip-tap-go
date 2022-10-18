export const StatsModule = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center mr-2 text-center h-full">
      <div className="stats-module-value text-xl font-bold">{value}</div>
      <div className="stats-module-label leading-5">{label}</div>{" "}
    </div>
  );
};
