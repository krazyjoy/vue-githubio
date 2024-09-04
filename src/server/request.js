import axios from 'axios';


const baseURL = `${import.meta.env.VITE_HOST}`

const request = axios.create({
    baseURL: baseURL
});

request.interceptors.response.use(
    (response) => {
        console.log("request.response.data: ",response.data)
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
);


export default request;

