import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type Todo = {
  id: string;
  content: string;
};

type UseTodo = {
  todos: Todo[];
  add: (content: string) => void;
  delete: (id: string) => void;
  reset: () => void;
  modify: (id: string, content: string) => void;
};

const useTodo = create<UseTodo>((set) => ({
  todos: [],
  add: (content: string) =>
    set((state) => ({ todos: [...state.todos, { id: uuidv4(), content }] })),
  delete: (id: string) =>
    set((state) => ({
      todos: [...state.todos].filter(({ id: _id }) => id !== _id),
    })),
  reset: () =>
    set(() => ({
      todos: [],
    })),
  modify: (id: string, content: string) =>
    set((state) => ({
      todos: [...state.todos].map(({ id: _id, content: _content }) => {
        if (id === _id) {
          return { id, content };
        } else {
          return { id: _id, content: _content };
        }
      }),
    })),
}));

export default useTodo;
