// src/services/api.js

const API_BASE_URL = 'YOUR_API_BASE_URL';

// Helper para manejar errores de fetch
const handleFetchErrors = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return handleFetchErrors(response);
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleFetchErrors(response);
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleFetchErrors(response);
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  return handleFetchErrors(response);
};