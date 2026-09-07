import axios from 'axios';




const BASE_URL ='https://momento-ddm3.onrender.com';

export const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
});


