import { IndexMap } from "./Gameboard";

export interface IBoardCell {
  id: string;
  index: IndexMap;
  isBlock: boolean;
  isDestroyed: boolean;
  isSelected: boolean;
  value: number;
  originalValue: number;
  reinforced?: boolean;
  onClick?: any;
}

/**
 * A BoardCell can contain either a BoardBlock or a BoardRadius.
 *
 * @param BoardCell
 */
export const BoardCell = ({
  value,
  isBlock,
  onClick,
  isSelected,
  isDestroyed,
}: IBoardCell) => {
  const block = isBlock ? " is-block" : "";
  const selected = isSelected ? " is-selected" : "";
  const destroyed = isDestroyed ? " is-destroyed" : "";

  function createRipple(event: React.MouseEvent<HTMLDivElement>) {
    if (isBlock) {
      onClick(event);
      return;
    }
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = "0px";
    circle.style.top = "0px";
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    onClick(event);
  }

  return (
    <div
      className={`board-cell${block}${selected}${destroyed}`}
      onClick={createRipple}
    >
      <div className="board-cell-overlay" />
      {value > 0 && (
        <span
          className={`font-bold text-xl ${
            isDestroyed ? "text-white" : "text-black"
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
};
