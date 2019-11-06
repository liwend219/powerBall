import axios from 'axios'
import Interface from '../lib/index'
import qs from 'qs'
var instance = axios.create({
    baseURL: Interface.http,
    timeout: 10000,
    method:'post',
    // withCredentials: true,
    contentType: "application/json",
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
});



instance.interceptors.request.use((config) => {
    if(config.method === 'post') {
        config.data = qs.stringify({
            ...config.data
        })
    } 
    return config;
},(error) =>{
    return Promise.reject(error);
});

instance.interceptors.response.use((config) => {
    return config.data
},(error) =>{
    return Promise.reject(error);
});

export default instance