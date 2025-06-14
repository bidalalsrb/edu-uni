import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // like 'https://example.com/api'
    withCredentials: true,
});

export default api;