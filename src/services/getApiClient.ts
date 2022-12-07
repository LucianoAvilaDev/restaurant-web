import axios, { AxiosInstance } from "axios";
import { setCookie, parseCookies } from "nookies";

export function getApiClient(ctx?: any) {

  const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'text'

  });

  const { "restaurantApp.token": token } = parseCookies(ctx);

  if (token)
    api.defaults.headers['Authorization'] = `bearer ${token}`

  return api;
}
