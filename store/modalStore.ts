import { create } from "zustand";
type State = {
  isOpen: boolean;
};

type Action = {
  openModal: () => void;
  closeModal: () => void;
};

const modalStore = create<State & Action>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default modalStore;
