import axios from 'axios';

const  api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    try {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    } catch (error) {
        console.error(error);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
