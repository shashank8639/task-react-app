import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (jwtToken) => {
  if (jwtToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    localStorage.setItem('token', jwtToken);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
}

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
}

export const user = async (username) => {
  const response = await api.get(`/user`, {
    params: { username }
  });
  return response.data;
}

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    console.log('From api file ,', decoded.isAdmin);
    return decoded.isAdmin;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Role functions
export const getAllRoles = async () => {
  const response = await api.get(`/roles/all`);
  return response.data;
};

export const addRole = async (role) => {
  const response = await api.post(`/roles/add`, role);
  return response.data;
};

export const assignRoleToUser = async (username, role) => {
  const response = await api.post(`/roles/assign`, {}, {
    params: {username, role}
  });
  return response.data;
};

// Task functions
export const addTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const getAllTasks = async () => {
  const response = await api.get(`/tasks/all`);
  return response.data;
};

export const getUserTasks = async () => {
  const response = await api.get("/tasks/user");
  return response.data;
};

export const getPendingTasks = async () => {
  const response = await api.get(`/tasks/pending`);
  return response.data;
};

export const getCompletedTasks = async () => {
  const res = await axios.get(`/tasks/completed`);
  return res.data;
};
export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTaskById = async (id) => {
  await api.delete(`/tasks/remove/id/${id}`);
};

export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};