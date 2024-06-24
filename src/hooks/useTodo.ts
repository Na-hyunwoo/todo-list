import { Todo } from "@/utils/type";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type PartialTodo = Partial<Omit<Todo, "id">> & { id: string };

type UseTodo = {
  todos: Todo[];
  add: (content: string) => void;
  delete: (id: string) => void;
  reset: () => void;
  modify: (todo: PartialTodo) => void;
};

const useTodo = create<UseTodo>((set) => ({
  todos: [],
  add: (content) =>
    set((state) => ({
      todos: [...state.todos, { id: uuidv4(), content, checked: false }],
    })),
  delete: (id) =>
    set((state) => ({
      todos: [...state.todos].filter(({ id: _id }) => id !== _id),
    })),
  reset: () =>
    set(() => ({
      todos: [],
    })),
  modify: ({ id, content, checked }) =>
    set((state) => ({
      todos: [...state.todos].map(
        ({ id: _id, content: _content, checked: _checked }) => {
          if (id === _id) {
            return {
              id,
              content: content ?? _content,
              checked: checked ?? _checked,
            };
          } else {
            return {
              id: _id,
              content: _content,
              checked: _checked,
            };
          }
        },
      ),
    })),
}));

export default useTodo;
