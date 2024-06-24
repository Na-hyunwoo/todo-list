import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import { MODAL_KEY } from "@/utils/const";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal from "./Modal";

function AddTodoModal() {
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
    onClose(MODAL_KEY.ADD_TODO);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleClickAdd();
      }

      // TODO: input의 입력값 있으면 confirm 추가하기
      if (e.key === "Escape") {
        e.preventDefault();
        onClose(MODAL_KEY.ADD_TODO);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);

  return (
    <Modal
      value={value}
      onChangeInput={handleChangeInput}
      onClickAdd={handleClickAdd}
      onClickClose={handleClickClose}
      placeholder="할 일을 적어주세요."
      confirmButtonLabel="추가"
      cancelButtonLabel="취소"
    />
  );
}

export default AddTodoModal;
