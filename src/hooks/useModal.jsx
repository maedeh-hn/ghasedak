import { useState } from 'react';

const useModal = () => {
    const [modals, setModals] = useState([]);

    function openModal(data) {
        setModals([...modals, data]);
    }

    function closeModal() {
        setModals(modals.slice(0, -1));
    }

    return {
        isOpen: modals.length > 0,
        openModal,
        closeModal,
        modalData: modals[modals.length - 1],
    };
}

export default useModal;