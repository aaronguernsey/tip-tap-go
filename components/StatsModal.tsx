import { HARD_MODE_TITLE, NORMAL_MODE_TITLE } from "../constants/content";
import { BaseModal, IBaseModalProps } from "./BaseModal";
import { StatsModule } from "./StatsModule";

export interface IStatsModalProps extends IBaseModalProps {
  totalBlocksDestroyed?: number;
  totalTipTapsUsed?: number;
  totalGamesPlayed?: number;
  longestStreak?: number;
  isHardMode: boolean;
}

export const StatsModal = ({
  totalBlocksDestroyed = 0,
  totalTipTapsUsed = 0,
  totalGamesPlayed = 0,
  longestStreak = 0,
  isHardMode,
  isOpen,
  handleClose,
  children,
}: IStatsModalProps) => {
  const mode = isHardMode ? NORMAL_MODE_TITLE : HARD_MODE_TITLE;
  return (
    <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col">
        <h1 className="text-lg text-center mb-4">
          Mode: <span className="font-bold">{mode}</span>
        </h1>
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
