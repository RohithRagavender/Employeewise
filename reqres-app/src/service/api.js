import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://reqres.in/api",
});

// Global Error Handling
const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.error || "Something went wrong!";
  }
  return "Network error. Please try again!";
};

// Authentication API
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch Users API
export const fetchUsers = async (page) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update User API
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete User API
export const deleteUser = async (userId) => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export default api;
