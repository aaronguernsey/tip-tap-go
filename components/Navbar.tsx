import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { GAME_TITLE } from "../constants/content";

export interface INavbarProps {
  setIsInfoModalOpen?: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
  setIsSettingsModalOpen?: (value: boolean) => void;
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: INavbarProps) => {
  return (
    <div className="flex items-center p-5 border-b">
      <div className="flex w-10"></div>
      <h1 className="grow text-center font-bold text-2xl">{GAME_TITLE}</h1>
      <div className="flex justify-end w-10">
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
    </div>
  );
};
