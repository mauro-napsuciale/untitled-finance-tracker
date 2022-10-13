import axios from "axios";

const backendURL: string = process.env.API_URL;

export function httpGet(URL: string): Promise<any> {
    const token: string = sessionStorage.getItem('ufa-token');
    return axios.get(backendURL + URL, { headers: { Authorization: `Bearer ${token}` } });
}

export function httpPost(URL: string, body: object | FormData): Promise<any> {
    const token: string = sessionStorage.getItem('ufa-token');
    return axios.post(backendURL + URL, { data: body }, { headers: { Authorization: `Bearer ${token}` } });
}

export function httpPut(URL: string, body: object | FormData): Promise<any> {
    const token: string = sessionStorage.getItem('ufa-token');
    return axios.put(backendURL + URL, { data: body }, { headers: { Authorization: `Bearer ${token}` } });
}

export function httpDelete(URL: string): Promise<any> {
    const token: string = sessionStorage.getItem('ufa-token');
    return axios.delete(backendURL + URL, { headers: { Authorization: `Bearer ${token}` } });
}

export function login(body: object) {
    return axios.post(backendURL + '/auth/local', body);
}