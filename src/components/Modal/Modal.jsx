import { Component } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    };

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose()
        }
    }

    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
                    <img src={this.props.modalImg} alt="" />
                </div>
            </div>,
            modalRoot)
        }
    };

export default Modal;

Modal.propType = {
    modalImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};