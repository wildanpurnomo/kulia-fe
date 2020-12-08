import axios from 'axios';

export default class BaseService {
    constructor() {
        this.baseUrl = process.env.VUE_APP_API_BASE_URL;
        //this.baseUrl = 'http://localhost:4000/api';
    }

    sendAPIRequest(endpoint, method = 'GET', requestBody = null) {
        requestBody = requestBody === null ? {} : requestBody;
        let result;
        if (method === 'GET') {
            result = axios.get(`${this.baseUrl}${endpoint}`, { params: requestBody });
        } else if (method === 'POST') {
            result = axios.post(`${this.baseUrl}${endpoint}`, requestBody);
        } else if (method === 'PUT') {
            result = axios.put(`${this.baseUrl}${endpoint}`, requestBody);
        } else if (method === 'DELETE') {
            result = axios.delete(`${this.baseUrl}${endpoint}`);
        }
        return result
            .then(
                response => {
                    this.logResponseIfDebug(endpoint, response.data);
                    return response;
                }
            );
    }

    logResponseIfDebug(endpoint, responseData) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Response from ${endpoint}`, responseData);
        }
    }
}