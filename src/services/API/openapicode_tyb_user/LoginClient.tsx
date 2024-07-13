// axiosClient.js

import {AuthApi} from "./api";
import axios from "axios";


const instance = axios.create({
    baseURL: 'https://tybbackend.azurewebsites.net/api', // Sostituisci con l'URL della tua API
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Altre intestazioni personalizzate, se necessario
    },
});

// Aggiungi un interceptor per includere il token in tutte le richieste
instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


const AuthClient = new AuthApi(undefined, 'https://tybbackend.azurewebsites.net/api', instance);

export default AuthClient;
