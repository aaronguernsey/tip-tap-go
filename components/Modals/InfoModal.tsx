import { BoardRow, IBoardCell, ListItem } from "..";
import { GAME_RULES, META_DESCRIPTION_SIMPLE } from "../../constants/content";
import { DEMO_BOARD_1, DEMO_BOARD_2, DEMO_BOARD_3 } from "../../lib/gameboard";
import { BaseModal, IBaseModalProps } from "./BaseModal";

export interface IInfoModalProps extends IBaseModalProps {
  isModern: boolean;
}

export const InfoModal = ({
  isOpen,
  isModern,
  handleClose,
}: IInfoModalProps) => {
  const rulesListItems = GAME_RULES.map((rule: string, index: number) => (
    <ListItem key={index} content={rule} />
  ));

  const boardStyle = isModern ? "is-modern" : "is-retro";

  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <h2 className="text-lg font-bold">{META_DESCRIPTION_SIMPLE}</h2>
      <section>
        <ul className="list-disc pl-4 my-3">{rulesListItems}</ul>
      </section>
      <section>
        <h3 className="mb-2 font-bold">Examples</h3>

        <div className="mb-5">
          <div className={`board board-freeze mb-2 ${boardStyle}`}>
            {DEMO_BOARD_1.map((row, i) => (
              <BoardRow key={i} row={row} index={i} />
            ))}
          </div>
          <p>The tip tap is adjacent to the blocks and destroys it.</p>
        </div>
        <div className="mb-5">
          <div className={`board board-freeze mb-2 ${boardStyle}`}>
            {DEMO_BOARD_2.map((row, i) => (
              <BoardRow key={i} row={row} index={i} />
            ))}
          </div>
          <p>
            The tip tap is adjacent to multiple blocks and destroys all three
            blocks.
          </p>
        </div>
        <div className="mb-5">
          <div className={`board board-freeze mb-2 ${boardStyle}`}>
            {DEMO_BOARD_3.map((row, i) => (
              <BoardRow key={i} row={row} index={i} />
            ))}
          </div>
          <p>
            The tip taps are not adjacent to the block and do not destroy it.
          </p>
        </div>
      </section>
    </BaseModal>
  );
};
