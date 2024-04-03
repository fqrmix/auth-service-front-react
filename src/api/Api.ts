import axios from "axios";

const BASE_URL = "https://api.fqrmix.ru/api/v1"

const apiInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export { apiInstance };