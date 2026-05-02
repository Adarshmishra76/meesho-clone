import axios from 'axios';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure axios to always send credentials (cookies) with requests
axios.defaults.withCredentials = true;

// Set default base URL
axios.defaults.baseURL = API_URL;

console.log('API URL configured:', API_URL);

export default axios;
