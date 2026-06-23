import axios from "axios";

export const accessToken = import.meta.env.VITE_ACCESS_TOKEN

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL,
    headers: {Authorization: `Bearer ${accessToken}`}
});

export const posterBaseUrl = import.meta.env.VITE_POSTER_BASE_URL
