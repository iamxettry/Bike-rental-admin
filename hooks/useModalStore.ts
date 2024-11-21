// useModal.js

import modalStore from "@/store/modalStore";

export const useModal = () => {
  const {
    isModalOpen,
    openModal,
    closeModal,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    bikeId,
    setBikeId,
    preview,
    setPreview,
  } = modalStore();

  return {
    isModalOpen,
    openModal,
    closeModal,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    bikeId,
    setBikeId,
    preview,
    setPreview,
  };
};
