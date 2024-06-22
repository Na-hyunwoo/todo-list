import { useState } from "react";
import useModal from "@/hooks/useModal";
import Spacing from "@/components/Spacing";
import { MODAL_KEY } from "@/utils/const";
import AddTodoModal from "@/components/AddTodoModal";
import CreateModal from "@/components/CreateModal";

type Todo = {
  key: string;
  content: string;
};

function TodoList() {
  const [onOpen] = useModal((state) => [state.onOpen]);

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClickAdd = () => {
    onOpen(MODAL_KEY.ADD_TODO);
  };

  const handleClickReset = () => {
    setTodos([]);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8">
        <h1 className="text-4xl font-bold ">현우의 TODO 애플리케이션</h1>
        <Spacing height={32} />
        <div className="flex flex-col items-center">
          <div className="flex gap-10 justify-center">
            <button className="text-xl font-bold" onClick={handleClickAdd}>
              추가하기
            </button>
            <button className="text-xl font-bold" onClick={handleClickReset}>
              초기화하기
            </button>
          </div>

          <Spacing height={32} />

          <ul>
            {todos.map(({ key, content }) => (
              <li className="font-bold flex gap-4" key={key}>
                <p>{content}</p>
                <div className="flex gap-2">
                  <button>수정하기</button>
                  <button>저장하기</button>
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
