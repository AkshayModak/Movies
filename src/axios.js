import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/',
});

/*
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin';
*/

// instance.interceptors.request...

export default instance;