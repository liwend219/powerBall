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



instance.interceptors.request.use((configs) => {
    configs.url = configs.url+ `?version=${Interface.version}`
    console.log(configs)
    if(configs.method === 'post') {
        // config.data = qs.stringify({
        //     ...config.data
        // })
        let t = qs.stringify({
            ...configs.data
        })
        let t1 = t + `&version=${Interface.version}`
        configs.data = t1
    } 
    return configs;
},(error) =>{
    return Promise.reject(error);
});

instance.interceptors.response.use((configs) => {
    return configs.data
},(error) =>{
    return Promise.reject(error);
});

export default instance