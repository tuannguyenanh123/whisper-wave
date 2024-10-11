import { Modal, useGeneralStore } from "../stores/generalStore";

export default function useModal(modalType: Modal) {
  const activeModal = useGeneralStore((state) => state.activeModal);
  const setActiveModal = useGeneralStore((state) => state.setActionModal);
  const isOpen = activeModal === modalType;

  const openModal = () => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return { isOpen, openModal, closeModal };
}
