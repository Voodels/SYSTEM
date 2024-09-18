import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Adjust if needed

const api = axios.create({
  baseURL: BASE_URL,
});

const ApiHandler = {
  // Tasks
  tasks: {
    getTasks: async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
    addTask: async (task) => {
      const response = await api.post('/tasks', task);
      return response.data;
    },
    deleteTask: async (id) => {
      await api.delete(`/tasks/${id}`);
    },
    updateTask: async (id, updates) => {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data;
    },
  },

  // Users
  users: {
    getUsers: async () => {
      const response = await api.get('/users');
      return response.data;
    },
    addUser: async (user) => {
      const response = await api.post('/users', user);
      return response.data;
    },
    deleteUser: async (id) => {
      await api.delete(`/users/${id}`);
    },
    updateUser: async (id, updates) => {
      const response = await api.put(`/users/${id}`, updates);
      return response.data;
    },
  },

  // Projects
  projects: {
    getProjects: async () => {
      const response = await api.get('/projects');
      return response.data;
    },
    addProject: async (project) => {
      const response = await api.post('/projects', project);
      return response.data;
    },
    deleteProject: async (id) => {
      await api.delete(`/projects/${id}`);
    },
    updateProject: async (id, updates) => {
      const response = await api.put(`/projects/${id}`, updates);
      return response.data;
    },
  },

  // Add more resource handlers as needed
};

export default ApiHandler;