import useTodo from "@/hooks/useTodo";
import { ChangeEvent } from "react";

function TodoList() {
  const [todos, modify] = useTodo((state) => [
    state.todos,
    state.modify,
    state.reset,
  ]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    modify({ id, checked: e.target.checked });
  };

  const handleClickText = () => {};

  return (
    /**
     * 1. 수정하기는 커서 올려서 클릭하면, 그리고 밖에 클릭하면 사라짐
     * 2. 삭제하기는 x 버튼으로 대체 ?
     */
    <ul className="flex flex-col gap-2">
      {todos.map(({ id, content, checked }) => (
        <li className="flex font-bold" key={id}>
          <input
            type="checkbox"
            checked={checked}
            className="w-5 cursor-pointer"
            onChange={(e) => handleChangeInput(e, id)}
          />
          <p
            className={`pl-2 pr-4 ${checked && "line-through"}`}
            onClick={handleClickText}
          >
            {content}
          </p>
          <div className="flex gap-2">
            <button>수정하기</button>
            <button>삭제하기</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
