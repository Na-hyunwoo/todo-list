import useModal from "@/hooks/useModal";
import Spacing from "@/components/Spacing";
import { MODAL_KEY } from "@/utils/const";
import AddTodoModal from "@/components/AddTodoModal";
import CreateModal from "@/components/CreateModal";
import useTodo from "@/hooks/useTodo";
import { ChangeEvent } from "react";

function TodoList() {
  const [onOpen] = useModal((state) => [state.onOpen]);

  const [todos, modify, reset] = useTodo((state) => [
    state.todos,
    state.modify,
    state.reset,
  ]);

  const handleClickAdd = () => {
    onOpen(MODAL_KEY.ADD_TODO);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    modify({ id, checked: e.target.checked });
  };

  return (
    <>
      <div className="my-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">현우의 TODO 애플리케이션</h1>
        <Spacing height={32} />
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-10">
            <button className="text-xl font-bold" onClick={handleClickAdd}>
              추가하기
            </button>
            <button className="text-xl font-bold" onClick={reset}>
              초기화하기
            </button>
          </div>

          <Spacing height={32} />

          {/**
           * 1. 체크되면 content에 찍 그어짐
           * 2. 수정하기는 커서 올려서 클릭하면, 그리고 밖에 클릭하면 사라짐
           * 3. 삭제하기는 x 버튼으로 대체 ?
           */}
          <ul className="flex flex-col gap-2">
            {todos.map(({ id, content, checked }) => (
              <li className="flex font-bold" key={id}>
                <input
                  type="checkbox"
                  checked={checked}
                  className="w-5 cursor-pointer"
                  onChange={(e) => handleChangeInput(e, id)}
                />
                <p className={`pl-2 pr-4 ${checked && "line-through"}`}>
                  {content}
                </p>
                <div className="flex gap-2">
                  <button>수정하기</button>
                  <button>삭제하기</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CreateModal id={MODAL_KEY.ADD_TODO}>
        <AddTodoModal />
      </CreateModal>
    </>
  );
}

export default TodoList;
