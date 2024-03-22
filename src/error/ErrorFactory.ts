import { AxiosError } from "axios";
import { IErrorResponse } from "../models/IAuthResponse";

export default class ErrorFactory {

    public static make(error: AxiosError): IErrorResponse {
        if(error.response) {
            return (error.response.data as IErrorResponse)
        } else if (error.request) {
            return {
                type: 'error',
                message: 'No response from the server',
                code: 'UnknownError',
                errors: ['No response from the server']
            }
        } else {
            return {
                type: 'error',
                message: 'Interanl Server Error',
                code: 'InteranlServerError',
                errors: ['Interanl Server Error']
            }
        }
    }
}