import { BaseModal, IBaseModalProps } from "./BaseModal";
import { StatsModule } from "./StatsModule";

export interface IStatsModalProps extends IBaseModalProps {
  totalBlocksDestroyed?: number;
  totalTipTapsUsed?: number;
  totalGamesPlayed?: number;
  longestStreak?: number;
}

export const StatsModal = ({
  totalBlocksDestroyed = 0,
  totalTipTapsUsed = 0,
  totalGamesPlayed = 0,
  longestStreak = 0,
  isOpen,
  handleClose,
  children,
}: IStatsModalProps) => {
  return (
    <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col text-center">
        <div className="flex mb-8">
          <StatsModule label="Blocks Destroyed" value={totalBlocksDestroyed} />
          <StatsModule label="Tip Taps Used" value={totalTipTapsUsed} />
          <StatsModule label="Longest Streak" value={longestStreak} />
          <StatsModule label="Games Played" value={totalGamesPlayed} />
        </div>

        {children}
      </div>
    </BaseModal>
  );
};
