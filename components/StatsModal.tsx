import { BaseModal, IBaseModalProps } from "./BaseModal";
import { StatsModule } from "./StatsModule";

export interface IStatsModalProps extends IBaseModalProps {
  totalBlocksDestroyed?: number;
  totalTipTapsUsed?: number;
  totalGamesPlayed?: number;
  longestStreak?: number;
  gameMode: string;
}

export const StatsModal = ({
  totalBlocksDestroyed = 0,
  totalTipTapsUsed = 0,
  totalGamesPlayed = 0,
  longestStreak = 0,
  gameMode = "Normal",
  isOpen,
  handleClose,
  children,
}: IStatsModalProps) => {
  return (
    <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col">
        <h1 className="text-lg text-center mb-4">
          Mode: <span className="font-bold">{gameMode}</span>
        </h1>
        <div className="flex mb-8">
          <StatsModule label="Blocks Destroyed" value={totalBlocksDestroyed} />
          <StatsModule label="Tip Taps Used" value={totalTipTapsUsed} />
          <StatsModule label="Longest Streak" value={longestStreak + "s"} />
          <StatsModule label="Games Played" value={totalGamesPlayed} />
        </div>

        {children}
      </div>
    </BaseModal>
  );
};
