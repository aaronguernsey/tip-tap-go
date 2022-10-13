import { DISABLED_SETTINGS_MESSAGE } from "../constants/content";
import { BaseModal, IBaseModalProps } from "./BaseModal";
import { SettingsToggle } from "./SettingsToggle";

export interface ISettingsModalProps extends IBaseModalProps {
  isHardMode: boolean;
  handleHardMode: Function;
  isGameActive: boolean;
}

export const SettingsModal = ({
  isHardMode,
  handleHardMode,
  isOpen,
  isGameActive,
  handleClose,
  children,
}: ISettingsModalProps) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col">
        <div className="flex mb-8">
          <SettingsToggle
            settingName="Hard Mode"
            flag={isHardMode}
            handleFlag={handleHardMode}
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
