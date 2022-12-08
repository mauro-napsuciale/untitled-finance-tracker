import axios from "axios";

const backendURL: string = import.meta.env.VITE_BACKEND_URL;
const apiPrefix: string = import.meta.env.VITE_API_PREFIX;

export function httpGet(URL: string): Promise<any> {
    const token: string = sessionStorage.getItem('uft-token');
    return axios.get(backendURL + apiPrefix + URL, { headers: { Authorization: `Bearer ${token}` } });
}

export function httpPost(URL: string, body: object | FormData): Promise<any> {
    const token: string = sessionStorage.getItem('uft-token');
    return axios.post(backendURL + apiPrefix + URL, { data: body }, { headers: { Authorization: `Bearer ${token}` } });
}

export function httpPut(URL: string, body: object | FormData): Promise<any> {
    const token: string = sessionStorage.getItem('uft-token');
    return axios.put(backendURL + apiPrefix + URL, { data: body }, { headers: { Authorization: `Bearer ${token}` } });
}

export function httpDelete(URL: string): Promise<any> {
    const token: string = sessionStorage.getItem('uft-token');
    return axios.delete(backendURL + apiPrefix + URL, { headers: { Authorization: `Bearer ${token}` } });
}

export function login(body: object) {
    return axios.post(backendURL + apiPrefix + '/auth/local', body);
}