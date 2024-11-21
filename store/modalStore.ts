import { create } from "zustand";
type State = {
  isDrawerOpen: boolean;
  isModalOpen: boolean;
  bikeId: string;
  preview: string | null;
};

type Action = {
  openModal: () => void;
  closeModal: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setBikeId: (value: string) => void;
  setPreview: (value: string | null) => void;
};

const modalStore = create<State & Action>((set) => ({
  isDrawerOpen: false,
  isModalOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false, bikeId: "", preview: null }),

  bikeId: "",
  setBikeId: (value) => set({ bikeId: value }),

  preview: null,
  setPreview: (value) => set({ preview: value }),

  // modal
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default modalStore;
