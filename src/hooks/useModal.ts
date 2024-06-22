import { create } from "zustand";

type Modal = {
  id: string;
  isOpen: boolean;
};

type UseModal = {
  modals: Modal[];
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
};

const useModal = create<UseModal>((set) => ({
  modals: [],
  onOpen: (id: string) =>
    set((state) => ({ modals: [...state.modals, { id, isOpen: true }] })),
  onClose: (id: string) =>
    set((state) => ({
      modals: [...state.modals].filter(({ id: _id }) => _id !== id),
    })),
}));

export default useModal;
