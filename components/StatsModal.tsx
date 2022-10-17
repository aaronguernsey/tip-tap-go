import { HEATMAP_TITLE, SHARE_TEXT } from "../constants/content";
import { shareStatus } from "../lib/share";
import { BaseModal, IBaseModalProps } from "./BaseModal";
import { Button } from "./Button";
import { StatsModule } from "./StatsModule";

export interface IStatsModalProps extends IBaseModalProps {
  totalBlocksDestroyed?: number;
  totalTipTapsUsed?: number;
  totalGamesPlayed?: number;
  longestStreak?: number;
  currentStreak?: number;
  gameMode: string;
  heatmap?: string;
  handleShareToClipboard: () => void;
  handleShareFailure: () => void;
}

export const StatsModal = ({
  totalBlocksDestroyed = 0,
  totalTipTapsUsed = 0,
  totalGamesPlayed = 0,
  longestStreak = 0,
  gameMode = "Normal",
  heatmap,
  currentStreak = 0,
  isOpen,
  handleClose,
  handleShareToClipboard,
  handleShareFailure,
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

        {heatmap && (
          <div className="flex flex-col border-t-2 pt-3 text-center">
            <h2 className="text-lg uppercase font-bold mb-4">
              {HEATMAP_TITLE}
            </h2>
            <div className="whitespace-pre text-center">{heatmap}</div>
            {currentStreak > 0 && (
              <div className="mt-6">
                <Button
                  onClick={() => {
                    shareStatus(
                      currentStreak,
                      heatmap,
                      handleShareToClipboard,
                      handleShareFailure
                    );
                  }}
                >
                  {SHARE_TEXT}
                </Button>
              </div>
            )}
          </div>
        )}

        {children}
      </div>
    </BaseModal>
  );
};
