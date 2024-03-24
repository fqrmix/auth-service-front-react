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

    login(username: string, password: string): Promise<IAuthResponse | IErrorResponse> {
        return new Promise((resolve, reject) => {
            AuthService.login(username, password)
                .then((res: AxiosResponse)  => {
                    this.setAuth(true);
                    return resolve(res.data as IAuthResponse)
                })
                .catch((err: AxiosError) => {
                    return reject(ErrorFactory.make(err));
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