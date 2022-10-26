import { ListItem } from "..";
import { GAME_RULES, META_DESCRIPTION_SIMPLE } from "../../constants/content";
import { BaseModal, IBaseModalProps } from "./BaseModal";

export interface IInfoModalProps extends IBaseModalProps {}

export const InfoModal = ({ isOpen, handleClose }: IInfoModalProps) => {
  const rulesListItems = GAME_RULES.map((rule: string, index: number) => (
    <ListItem key={index} content={rule} />
  ));
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <h2 className="text-lg font-bold">{META_DESCRIPTION_SIMPLE}</h2>
      <section>
        <ul className="list-disc pl-4 my-3">{rulesListItems}</ul>
      </section>
      {/* <section>
        <p>
          <strong>Examples</strong>
        </p>
        <p>Easy mode rules</p>
        <p>Normal mode rules</p>
        <p>Hard mode rules</p>
        <p>Transparency about local storage</p>
      </section> */}
    </BaseModal>
  );
};
