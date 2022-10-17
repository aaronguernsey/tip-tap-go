import {
  DISABLED_SETTINGS_MESSAGE,
  EASY_MODE_TITLE,
  HARD_MODE_TITLE,
  MISCELLANEOUS_SETTINGS_TITLE,
  SECONDS_NOTIFIER_LABEL,
} from "../constants/content";
import { BaseModal, IBaseModalProps } from "./BaseModal";
import { SettingsToggle } from "./SettingsToggle";

export interface ISettingsModalProps extends IBaseModalProps {
  isHardMode: boolean;
  isEasyMode: boolean;
  handleGameMode: Function;
  isGameActive: boolean;
  isSecondsNotifier: boolean;
  handleSecondsNotifier: Function;
}

export const SettingsModal = ({
  isHardMode,
  isEasyMode,
  handleGameMode,
  isSecondsNotifier,
  handleSecondsNotifier,
  isOpen,
  isGameActive,
  handleClose,
  children,
}: ISettingsModalProps) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col">
        <div className="flex flex-col mb-8">
          <SettingsToggle
            settingName={`${EASY_MODE_TITLE} Mode`}
            flag={isEasyMode}
            handleFlag={(v: boolean) => handleGameMode("easy", v)}
            disabled={isGameActive}
          />
          <SettingsToggle
            settingName={`${HARD_MODE_TITLE} Mode`}
            flag={isHardMode}
            handleFlag={(v: boolean) => handleGameMode("hard", v)}
            disabled={isGameActive}
          />
          <hr className="my-4" />
          <h5 className="text-sm font-bold uppercase">
            {MISCELLANEOUS_SETTINGS_TITLE}
          </h5>
          <SettingsToggle
            settingName={SECONDS_NOTIFIER_LABEL}
            flag={isSecondsNotifier}
            handleFlag={handleSecondsNotifier}
            disabled={isGameActive}
          />
        </div>

        {children}

        {isGameActive && (
          <div className="pt-4 border-t-2">{DISABLED_SETTINGS_MESSAGE}</div>
        )}
      </div>
    </BaseModal>
  );
};
