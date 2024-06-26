import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import { MODAL_KEY } from "@/utils/const";
import { ChangeEvent, useState } from "react";

type TodoItemProps = {
  id: string;
  content: string;
  checked: boolean;
};

function TodoItem({ id, content, checked }: TodoItemProps) {
  const [hover, setHover] = useState<boolean>(false);

  const [onOpen] = useModal((state) => [state.onOpen]);
  const [modify] = useTodo((state) => [state.modify]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    modify({ id, checked: e.target.checked });
  };

  const handleClickModify = () => {
    modify({ id, isModifying: true });
    onOpen(MODAL_KEY.MODIFY_TODO);
  };

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  return (
    <li
      className="relative flex font-bold"
      key={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <input
        type="checkbox"
        checked={checked}
        className="w-5 cursor-pointer"
        onChange={(e) => handleChangeInput(e, id)}
        id="todo"
      />

      <label
        htmlFor="todo"
        className={`pl-2 pr-4 ${checked && "line-through"}`}
      >
        {content}
      </label>

      {hover && (
        <div className="absolute right-[-60px] flex gap-2">
          <button onClick={handleClickModify}>수정</button>
          <button>삭제</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
