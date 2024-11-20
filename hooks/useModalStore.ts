// useModal.js

import modalStore from "@/store/modalStore";

export const useModal = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    editId,
    setEditId,
    preview,
    setPreview,
  } = modalStore();

  return {
    isOpen,
    openModal,
    closeModal,
    editId,
    setEditId,
    preview,
    setPreview,
  };
};
