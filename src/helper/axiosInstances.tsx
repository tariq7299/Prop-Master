import axios from "axios";
import SecureLS from 'secure-ls';

// This decrypts my token and gets it from localStorage using "secure-ls" package
const ls = new SecureLS();
const token = ls.get('token');

// Create an instance with a base URL for your API
export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
