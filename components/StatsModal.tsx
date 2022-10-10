import { BaseModal, IBaseModalProps } from "./BaseModal";
import { StatsModule } from "./StatsModule";

export interface IStatsModalProps extends IBaseModalProps {
  totalBlocksDestroyed?: number;
  totalRadiiUsed?: number;
  totalGamesPlayed?: number;
  totalSecondsPlayed?: number;
  longestGamePlayed?: number;
}

export const StatsModal = ({
  totalBlocksDestroyed = 0,
  totalRadiiUsed = 0,
  totalGamesPlayed = 0,
  totalSecondsPlayed = 0,
  longestGamePlayed = 0,
  isOpen,
  handleClose,
  children,
}: IStatsModalProps) => {
  return (
    <BaseModal title="Satistics" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col text-center">
        <div className="flex mb-8">
          <StatsModule label="Games Played" value={totalGamesPlayed} />
          <StatsModule label="Blocks Destroyed" value={totalBlocksDestroyed} />
          <StatsModule label="Radii Used" value={totalRadiiUsed} />
          <StatsModule label="Seconds Played" value={totalSecondsPlayed} />
          {/* <StatsModule label="Longest Game" value={longestGamePlayed} /> */}
        </div>

        {children}
      </div>
    </BaseModal>
  );
};
