import { useState } from "react";
import "./App.css";
import { Spacing } from "@/components/Spacing";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  key: string;
  content: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClickAdd = () => {
    setTodos((prev) => [
      ...prev,
      { key: uuidv4(), content: "새로운 할 일을 입력해 주세요" },
    ]);
  };

  const handleClickReset = () => {
    setTodos([]);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <h1 className="text-4xl font-bold ">현우의 TODO 애플리케이션</h1>
      <Spacing height={32} />
      <div className="flex flex-col items-center">
        <div className="flex gap-10 justify-center">
          <button onClick={handleClickAdd}>ADD</button>
          <button onClick={handleClickReset}>RESET</button>
        </div>

        <Spacing height={32} />

        <ul>
          {todos.map(({ key, content }) => (
            <div key={key}>{content}</div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
