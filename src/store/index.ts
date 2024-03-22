import { makeAutoObservable } from "mobx"
import AuthService from "../services/AuthService";
import { AxiosError, AxiosResponse } from "axios";
import { IAuthResponse, IErrorResponse } from "../models/IAuthResponse";
import ErrorFactory from "../error/ErrorFactory";


export default class ContextStore {

    isAuth = false;

    constructor () {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    login(username: string, password: string): Promise<IAuthResponse> {
        return new Promise((resolve, reject) => {
            AuthService.login(username, password)
                .then((res: AxiosResponse)  => {
                    setTimeout(() => {
                        this.setAuth(true);
                        resolve((res.data as IAuthResponse))
                    }, 1000);
                })
                .catch((err: AxiosError) => {
                    setTimeout(() => {
                        reject(ErrorFactory.make(err));
                    }, 1000);
                });
        })
    }

    logout() {
        try {
            const response = AuthService.logout();
            this.setAuth(false);
        } catch (e) {
            console.log(e)
        }
    }

}