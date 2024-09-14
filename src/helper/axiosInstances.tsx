import axios from "axios";
import Cookies from 'js-cookie';


const token = localStorage.getItem("token")
console.log("token", token)
// Create an instance with a base URL for your API
export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
