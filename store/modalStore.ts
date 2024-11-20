import { create } from "zustand";
type State = {
  isOpen: boolean;
  editId: string;
  preview: string | null;
};

type Action = {
  openModal: () => void;
  closeModal: () => void;
  setEditId: (value: string) => void;
  setPreview: (value: string | null) => void;
};

const modalStore = create<State & Action>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, editId: "", preview: null }),

  editId: "",
  setEditId: (value) => set({ editId: value }),

  preview: null,
  setPreview: (value) => set({ preview: value }),
}));

export default modalStore;
