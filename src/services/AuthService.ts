import { Axios, AxiosError, AxiosResponse } from "axios";
import { apiInstance } from "../api/Api";
import { IAuthResponse, IErrorResponse } from "../models/IAuthResponse";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse> {
        return await apiInstance.post<IAuthResponse>(
            "/auth/login", 
            { username, password })
    };

    static async logout(): Promise<void> {
        return await apiInstance.post("/auth/logout")
    };
}