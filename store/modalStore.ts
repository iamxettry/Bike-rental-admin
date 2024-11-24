import { create } from "zustand";
type State = {
  isDrawerOpen: boolean;
  isModalOpen: boolean;
  editId: string;
  preview: string | null;
};

type Action = {
  openModal: () => void;
  closeModal: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setEditId: (value: string) => void;
  setPreview: (value: string | null) => void;
};

const modalStore = create<State & Action>((set) => ({
  isDrawerOpen: false,
  isModalOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false, editId: "", preview: null }),

  editId: "",
  setEditId: (value) => set({ editId: value }),

  preview: null,
  setPreview: (value) => set({ preview: value }),

  // modal
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default modalStore;
