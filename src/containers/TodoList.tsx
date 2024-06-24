import TodoItem from "@/components/TodoItem";
import useTodo from "@/hooks/useTodo";

function TodoList() {
  const [todos] = useTodo((state) => [state.todos]);

  return (
    <ul className="flex flex-col gap-2">
      {todos.map(({ id, content, checked }) => (
        <TodoItem id={id} content={content} checked={checked} />
      ))}
    </ul>
  );
}

export default TodoList;
