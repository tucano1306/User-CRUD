import { useState } from 'react';
import PropTypes from 'prop-types';
import { Trash2, Edit } from 'lucide-react';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      
      const cleanDate = dateString.split('T')[0];
      
      
      const [year, month, day] = cleanDate.split('-');
      
      
      if (!year || !month || !day) return '';
      
      
      return `${month}/${day}/${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="user-card">
      <h3 className="user-name">{`${user.first_name} ${user.last_name}`}</h3>
      <div className="user-info">
        <div className="email-group">
          <span className="info-label">Correo electrónico:</span>
          <p className="user-email">{user.email}</p>
        </div>
        <div className="birthday-group">
          <span className="info-label">Cumpleaños:</span>
          <p className="user-birthday">
            <span className="birthday-emoji">🎂</span>
            {formatDate(user.birthday)}
          </p>
        </div>
      </div>

      <div className="user-actions">
        <button
          className="action-button edit"
          onClick={() => onEdit(user)}
          title="Editar usuario"
        >
          <Edit />
          <span>Editar</span>
        </button>
        
        <button
          className="action-button delete"
          onClick={() => setShowConfirmDelete(true)}
          title="Eliminar usuario"
        >
          <Trash2 />
          <span>Eliminar</span>
        </button>
      </div>

      {showConfirmDelete && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          <div className="confirmation-buttons">
            <button
              className="confirm-button"
              onClick={() => {
                onDelete(user.id);
                setShowConfirmDelete(false);
              }}
            >
              Sí, eliminar
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowConfirmDelete(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserCard;