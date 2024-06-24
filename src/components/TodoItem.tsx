import useTodo from "@/hooks/useTodo";
import { Todo } from "@/utils/type";
import { ChangeEvent } from "react";

function TodoItem({ id, content, checked }: Todo) {
  const [modify] = useTodo((state) => [state.modify]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    modify({ id, checked: e.target.checked });
  };

  const handleClickText = (id: string) => {
    modify({ id });
  };

  /**
   * 1. 수정하기는 커서 올려서 클릭하면, 그리고 밖에 클릭하면 사라짐
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

      <p
        className={`pl-2 pr-4 ${checked && "line-through"}`}
        onClick={() => handleClickText(id)}
      >
        {content}
      </p>

      <div className="flex gap-2">
        <button>수정</button>
        <button>삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;
