import { BaseModal, IBaseModalProps } from "./BaseModal";
import { SettingsToggle } from "./SettingsToggle";

export interface ISettingsModalProps extends IBaseModalProps {
  isHardMode: boolean;
  handleHardMode: Function;
}

export const SettingsModal = ({
  isHardMode,
  handleHardMode,
  isOpen,
  handleClose,
  children,
}: ISettingsModalProps) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="board-stats-content flex flex-col text-center">
        <div className="flex mb-8">
          <SettingsToggle
            settingName="Hard Mode"
            flag={isHardMode}
            handleFlag={handleHardMode}
          />
        </div>

        {children}
      </div>
    </BaseModal>
  );
};
