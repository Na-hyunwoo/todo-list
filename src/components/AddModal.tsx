import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import { MODAL_KEY } from "@/utils/const";
import { ChangeEvent, useRef, useState } from "react";
import Modal from "./Modal";
import useShortcutKey from "@/hooks/useShortcutKey";

function AddModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [onClose] = useModal((state) => [state.onClose]);
  const [add] = useTodo((state) => [state.add]);
  const [value, setValue] = useState<string>("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickAdd = () => {
    add(value);

    onClose(MODAL_KEY.ADD_TODO);
  };

  const handleClickClose = () => {
    window.confirm("작성중인 할 일 목록이 있습니다. 정말로 닫으시겠습니까 ?")
      ? onClose(MODAL_KEY.ADD_TODO)
      : null;
  };

  useShortcutKey({
    deps: [value],
    slashCallback: inputRef.current?.focus,
    enterCallback: handleClickAdd,
    escapeCallback: handleClickClose,
  });

  return (
    <Modal
      value={value}
      onChangeInput={handleChangeInput}
      onClickConfirm={handleClickAdd}
      onClickClose={handleClickClose}
      placeholder="할 일을 적어주세요."
      confirmButtonLabel="추가"
      cancelButtonLabel="취소"
    />
  );
}

export default AddModal;
