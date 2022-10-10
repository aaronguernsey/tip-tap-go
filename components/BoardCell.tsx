import { IndexMap } from "./Gameboard";
export interface Cell {
  id: string;
  index: IndexMap;
  isBlock: boolean;
  isDestroyed: boolean;
  isSelected: boolean;
  value?: any;
  reinforced?: boolean;
  onClick?: any;
}

/**
 * A BoardCell can contain either a BoardBlock or a BoardRadius.
 *
 * @param props
 */
export const BoardCell = ({
  value,
  isBlock,
  onClick,
  isSelected,
  isDestroyed,
}: Cell) => {
  const block = isBlock ? " is-block" : "";
  const selected = isSelected ? " is-selected" : "";
  const destroyed = isDestroyed ? " is-destroyed" : "";

  function createRipple(event: React.MouseEvent<HTMLDivElement>) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = "0px"; // `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = "0px"; // `${event.clientY - button.offsetTop - radius}px`;
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
