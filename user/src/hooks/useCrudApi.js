// src/hooks/useCrudApi.js
import { useState, useCallback } from 'react';

const BASE_URL = 'https://users-crud.academlo.tech';

const useCrudApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = useCallback(async (endpoint, options = {}) => {
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

  // GET request
  const getAll = useCallback(async () => {
    return handleRequest('/users/');
  }, [handleRequest]);

  const getById = useCallback(async (id) => {
    return handleRequest(`/users/${id}/`);
  }, [handleRequest]);

  // POST request
  const createUser = useCallback(async (userData) => {
    return handleRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }, [handleRequest]);

  // PUT request
  const updateUser = useCallback(async (id, userData) => {
    return handleRequest(`/users/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }, [handleRequest]);

  // PATCH request
  const patchUser = useCallback(async (id, partialData) => {
    return handleRequest(`/users/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(partialData)
    });
  }, [handleRequest]);

  // DELETE request
  const deleteUser = useCallback(async (id) => {
    return handleRequest(`/users/${id}/`, {
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
    patchUser,
    deleteUser
  };
};

export default useCrudApi;