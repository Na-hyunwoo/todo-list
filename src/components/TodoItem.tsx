import useModal from "@/hooks/useModal";
import useTodo from "@/hooks/useTodo";
import { MODAL_KEY } from "@/utils/const";
import { Todo } from "@/utils/type";
import { ChangeEvent } from "react";

function TodoItem({ id, content, checked }: Todo) {
  const [onOpen] = useModal((state) => [state.onOpen]);
  const [modify] = useTodo((state) => [state.modify]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    modify({ id, checked: e.target.checked });
  };

  const handleClickModify = () => {
    modify({ id, isModifying: true });
    onOpen(MODAL_KEY.MODIFY_TODO);
  };

  /**
   * 2. 삭제하기는 x 버튼으로 대체 ?
   */
  return (
    <li className="flex font-bold" key={id}>
      <input
        type="checkbox"
        checked={checked}
        className="w-5 cursor-pointer"
        onChange={(e) => handleChangeInput(e, id)}
      />

      <p className={`pl-2 pr-4 ${checked && "line-through"}`}>{content}</p>

      <div className="flex gap-2">
        <button onClick={handleClickModify}>수정</button>
        <button>삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;
