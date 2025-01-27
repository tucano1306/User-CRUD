import { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import './UserForm.css';

const UserForm = ({ user = null, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    birthday: user?.birthday || '',
    image_url: user?.image_url || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-close">
          <X />
        </button>
        
        <h2 className="modal-title">
          {user ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!user}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cumpleaños</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL de imagen (opcional)</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            {user ? 'Actualizar' : 'Crear'} Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    birthday: PropTypes.string,
    image_url: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default UserForm;