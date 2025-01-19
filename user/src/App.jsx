// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import UserCard from './components/UserCard/UserCard';
import UserForm from './components/UserForm/UserForm';
import Modal from './components/Modal';
import useCrudApi from './hooks/useCrudApi';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    message: ''
  });

  const { 
    loading, 
    getAll, 
    createUser, 
    updateUser, 
    deleteUser 
  } = useCrudApi();

  const showModal = (message) => {
    setModal({
      isOpen: true,
      message
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      message: ''
    });
  };

  const loadUsers = useCallback(async () => {
    const { data, error: apiError } = await getAll();
    if (apiError) {
      showModal('Error al cargar los usuarios');
    } else {
      setUsers(data);
    }
  }, [getAll]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreate = async (userData) => {
    const { error: apiError } = await createUser(userData);
    
    if (apiError) {
      showModal('Error al crear el usuario');
    } else {
      await loadUsers();
      setShowForm(false);
      showModal('El usuario Juan José Mosquera Gómez se ha agregado');
    }
  };

  const handleUpdate = async (userData) => {
    const { error: apiError } = await updateUser(selectedUser.id, userData);
    
    if (apiError) {
      showModal('Error al actualizar el usuario');
    } else {
      await loadUsers();
      setShowForm(false);
      setSelectedUser(null);
      showModal('El usuario se ha actualizado exitosamente');
    }
  };

  const handleDelete = async (userId) => {
    const { error: apiError } = await deleteUser(userId);
    
    if (apiError) {
      showModal('Error al eliminar el usuario');
    } else {
      await loadUsers();
      showModal('El usuario Juan José Mosquera Gómez se ha eliminado');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleSubmit = (userData) => {
    if (selectedUser) {
      handleUpdate(userData);
    } else {
      handleCreate(userData);
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Lista de Usuarios</h1>
        <button 
          className="create-button"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          Crear nuevo usuario
        </button>
      </div>

      <div className="users-container">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onClose={handleClose}
          disabled={loading}
        />
      )}

      <Modal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;