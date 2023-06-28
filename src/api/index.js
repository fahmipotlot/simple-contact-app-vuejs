import axios from 'axios';

let headers = {
    Accept: "application/json"
};

const token = localStorage.getItem('token')

if (token) {
    headers.Authorization = `Bearer ${token}`;
}

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: headers
})

export default Api