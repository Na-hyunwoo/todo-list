import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import { MODAL_KEY } from "@/utils/const";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
    <div className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
      <input
        ref={inputRef}
        autoFocus
        className="focus:outline-none"
        placeholder="할 일을 적어주세요."
        value={value}
        onChange={handleChangeInput}
      />
      <div className="flex justify-center gap-4">
        <button onClick={handleClickAdd}>추가하기</button>
        <button onClick={handleClickClose}>닫기</button>
      </div>
    </div>
  );
}

export default AddTodoModal;
