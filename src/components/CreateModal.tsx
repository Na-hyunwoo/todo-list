import useModal from "@/hooks/useModal";
import { MODAL_KEY } from "@/utils/const";
import { ReactElement } from "react";
import { createPortal } from "react-dom";

type CreateModalType = {
  id: string;
  children: ReactElement;
};

function CreateModal({ id, children }: CreateModalType) {
  const [modals] = useModal((state) => [state.modals]);
  const isOpen = modals.find(({ id: _id }) => id === _id)?.isOpen;

  if (!isOpen) {
    return null;
  }

  return createPortal(children, document.getElementById(MODAL_KEY.CONTAINER)!);
}

export default CreateModal;
