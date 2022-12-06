import axios, { AxiosInstance } from "axios";
import { setCookie, parseCookies } from "nookies";

const { "restaurantApp.token": token } = parseCookies();

const api:AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ?? ''
},
responseType: 'text'

});

export default api;