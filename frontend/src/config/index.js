import axios from 'axios';



// const BASE_URL = 'http://localhost:8000';

const BASE_URL ='https://momento-ddm3.onrender.com/api/posts';

export const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
});


