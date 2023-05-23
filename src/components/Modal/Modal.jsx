import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalImg, onClose }) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    });

    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            onClose();
            };
        };

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            onClose()
        };
    };
    
        return createPortal(
            <div className={css.overlay} onClick={handleBackdropClick}>
                <div className={css.modal}>
                    <img src={modalImg} alt="" />
                </div>
            </div>,
            modalRoot)
    };

export default Modal;

Modal.propType = {
    modalImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};