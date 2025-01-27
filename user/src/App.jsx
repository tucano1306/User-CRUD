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
    try {
      const { data } = await getAll();
      console.log('Usuarios cargados:', data);
      
      if (data && data.results) {
        setUsers(data.results);
        console.log('Users state updated:', data.results);
      } else {
        console.warn('Estructura de datos inesperada:', data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      showModal('Error al cargar los usuarios');
      setUsers([]);
    }
  }, [getAll]);

  
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  
  const handleCreate = async (userData) => {
    try {
      const { error: apiError } = await createUser(userData);
      if (apiError) {
        showModal('Error al crear el usuario');
      } else {
        await loadUsers();
        setShowForm(false);
        showModal('Usuario creado exitosamente');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      showModal('Error al crear el usuario');
    }
  };

  const handleUpdate = async (userData) => {
    try {
      const { error: apiError } = await updateUser(selectedUser.id, userData);
      if (apiError) {
        showModal('Error al actualizar el usuario');
      } else {
        await loadUsers();
        setShowForm(false);
        setSelectedUser(null);
        showModal('Usuario actualizado exitosamente');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      showModal('Error al actualizar el usuario');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const { error: apiError } = await deleteUser(userId);
      if (apiError) {
        showModal('Error al eliminar el usuario');
      } else {
        await loadUsers();
        showModal('Usuario eliminado exitosamente');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      showModal('Error al eliminar el usuario');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  
  if (loading && users.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Lista de Usuarios</h1>
        <button 
          className="create-button"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          + Crear nuevo usuario
        </button>
      </div>

      <div className="users-container">
        {users && users.length > 0 ? (
          users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-users">No hay usuarios para mostrar</div>
        )}
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleUpdate : handleCreate}
          onClose={handleCloseForm}
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