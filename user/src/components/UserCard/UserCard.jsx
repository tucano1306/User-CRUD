
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Trash2, Edit } from 'lucide-react';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  
  useEffect(() => {
    console.log('UserCard received user:', user);
  }, [user]);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    console.log('Delete clicked for user:', user.id);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    console.log('Confirming delete for user:', user.id);
    onDelete(user.id);
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  
  if (!user || !user.first_name || !user.last_name) {
    console.warn('UserCard received incomplete user data:', user);
    return <div>Error: Datos de usuario incompletos</div>;
  }

  return (
    <div className="user-card">
      <h3 className="user-name">{`${user.first_name} ${user.last_name}`}</h3>
      <div className="user-info">
        <p className="user-email">{user.email}</p>
        <p className="user-birthday">
          <span>Cumpleaños:</span> {user.birthday}
        </p>
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
          onClick={handleDeleteClick}
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
              onClick={handleConfirmDelete}
            >
              Sí, eliminar
            </button>
            <button
              className="cancel-button"
              onClick={handleCancelDelete}
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