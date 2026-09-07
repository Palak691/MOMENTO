import axios from 'axios';



// const BASE_URL = 'https://momento-p7t1.onrender.com'
const BASE_URL = 'http://localhost:8000';
export const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
});


