// src/hooks/useCrudApi.js
import { useState, useCallback } from 'react';

const BASE_URL = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users';

const useCrudApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = useCallback(async (endpoint = '', options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `${BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // GET - Obtener todos los usuarios
  const getAll = useCallback(async () => {
    return handleRequest();
  }, [handleRequest]);

  // GET - Obtener un usuario por ID
  const getById = useCallback(async (id) => {
    return handleRequest(`/${id}`);
  }, [handleRequest]);

  // POST - Crear un nuevo usuario
  const createUser = useCallback(async (userData) => {
    return handleRequest('', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }, [handleRequest]);

  // PUT - Actualizar un usuario
  const updateUser = useCallback(async (id, userData) => {
    return handleRequest(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }, [handleRequest]);

  // DELETE - Eliminar un usuario
  const deleteUser = useCallback(async (id) => {
    return handleRequest(`/${id}`, {
      method: 'DELETE'
    });
  }, [handleRequest]);

  return {
    loading,
    error,
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
  };
};

export default useCrudApi;