import { HEATMAP_TITLE, SHARE_TEXT } from "../../constants/content";
import { shareStatus } from "../../lib/share";
import { BaseModal, IBaseModalProps } from "./BaseModal";
import { Button } from "../Button";
import { StatsModule } from "../StatsModule";
import { SupportButton } from "../SupportButton";
import { ShareIcon } from "@heroicons/react/24/outline";

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
  function convertSeconds(seconds: number) {
    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}m ${remainingSeconds}s`;
  }

  const convertedLongestStreak = convertSeconds(longestStreak);
  const convertedCurrentStreak = convertSeconds(currentStreak);

  return (
    <BaseModal title="Statistics" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col">
        <div className="flex justify-around items-center mb-4">
          <h2 className="text-base text-center">
            Mode: <span className="text-lg font-bold">{currentGameMode}</span>
          </h2>
          <h2 className="text-base text-center">
            Best Streak:{" "}
            <span className="text-lg font-bold">{convertedLongestStreak}</span>
          </h2>
        </div>
        <div className="mb-4">
          <div className="flex">
            <StatsModule
              label="Blocks Destroyed"
              value={totalBlocksDestroyed}
            />
            <StatsModule label="Tip Taps Used" value={totalTipTapsUsed} />
            <StatsModule
              label="Current Streak"
              value={convertedCurrentStreak}
            />
            <StatsModule label="Games Played" value={totalGamesPlayed} />
          </div>
        </div>

        {heatmap && (
          <>
            <div className="flex flex-col text-center mb-4">
              <h2 className="text-base uppercase font-bold">{HEATMAP_TITLE}</h2>

              <div className="whitespace-pre text-center">{heatmap}</div>
            </div>

            <div className="flex items-center border-t-2 py-4">
              <SupportButton classes="grow basis-36" />
              <Button
                classes="flex justify-center items-center grow basis-36"
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
                <ShareIcon className="mr-2 h-5 w-5 cursor-pointer dark:stroke-white" />
                <span className="text-base">{SHARE_TEXT}</span>
              </Button>
            </div>
          </>
        )}

        <div className="border-t-2 pt-3">
          <p className="text-sm">
            Tip Tap Go currently saves your stats to the browser or device you
            play on.
          </p>
        </div>

        {children}
      </div>
    </BaseModal>
  );
};
