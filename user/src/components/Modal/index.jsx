// src/components/Modal/Modal.jsx
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button 
          className="modal-button"
          onClick={onClose}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default Modal;