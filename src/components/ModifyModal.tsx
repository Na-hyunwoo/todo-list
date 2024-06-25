import useTodo from "@/hooks/useTodo";
import { ChangeEvent, useRef, useState } from "react";
import Modal from "./Modal";
import useModal from "@/hooks/useModal";
import { MODAL_KEY } from "@/utils/const";
import useShortcutKey from "@/hooks/useShortcutKey";

function ModifyModal() {
  const [onClose] = useModal((state) => [state.onClose]);
  const [todos, modify] = useTodo((state) => [state.todos, state.modify]);
  const modifyingTodo = todos.find(({ isModifying }) => isModifying);

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(modifyingTodo?.content ?? "");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickModify = () => {
    modify({ id: modifyingTodo!.id, content: value, isModifying: false });
    onClose(MODAL_KEY.MODIFY_TODO);
  };

  const handleClickClose = () => {
    modify({ id: modifyingTodo!.id, isModifying: false });
    onClose(MODAL_KEY.MODIFY_TODO);
  };

  useShortcutKey({
    deps: [value],
    slashCallback: inputRef.current?.focus,
    enterCallback: handleClickModify,
    escapeCallback: handleClickClose,
  });

  return (
    <Modal
      ref={inputRef}
      value={value}
      onChangeInput={handleChangeInput}
      onClickConfirm={handleClickModify}
      onClickClose={handleClickClose}
      placeholder="수정할 일을 적어주세요."
      confirmButtonLabel="수정"
      cancelButtonLabel="취소"
    />
  );
}

export default ModifyModal;
