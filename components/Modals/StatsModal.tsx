import { HEATMAP_TITLE, SHARE_TEXT } from "../../constants/content";
import { shareStatus } from "../../lib/share";
import { BaseModal, IBaseModalProps } from "./BaseModal";
import { Button } from "../Button";
import { StatsModule } from "../StatsModule";

export interface IStatsModalProps extends IBaseModalProps {
  totalBlocksDestroyed?: number;
  totalTipTapsUsed?: number;
  totalGamesPlayed?: number;
  longestStreak?: number;
  currentStreak?: number;
  gameMode: string;
  currentGameMode: string;
  heatmap?: string;
  handleShareToClipboard: () => void;
  handleShareFailure: () => void;
}

export const StatsModal = ({
  totalBlocksDestroyed = 0,
  totalTipTapsUsed = 0,
  totalGamesPlayed = 0,
  longestStreak = 0,
  currentGameMode = "Normal",
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
        <div className="flex justify-around items-center mb-4">
          <h1 className="text-lg text-center">
            Mode: <span className="font-bold">{currentGameMode}</span>
          </h1>
          <div>
            Longest Streak: <span className="font-bold">{longestStreak}s</span>
          </div>
        </div>
        <div className="flex mb-8">
          <StatsModule label="Blocks Destroyed" value={totalBlocksDestroyed} />
          <StatsModule label="Tip Taps Used" value={totalTipTapsUsed} />
          <StatsModule label="Current Streak" value={currentStreak + "s"} />
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
                      gameMode,
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
