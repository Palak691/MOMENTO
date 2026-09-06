import axios from 'axios';


const BASE_URL = 'https://momento-p7t1.onrender.com';


export const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
});


