// useModal.js

import modalStore from "@/store/modalStore";

export const useModal = () => {
  const { isOpen, openModal, closeModal } = modalStore();

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
