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
                errors: [
                    {  
                        error: 'Unknown Error',
                        description: 'От удаленного сервера не было получено ответа'
                    }
                ]
            }
        } else {
            return {
                type: 'error',
                message: 'Interanl Server Error',
                code: 'InteranlServerError',
                errors: [
                    {  
                        error: 'Interanl Server Error',
                        description: 'Произошла внутренняя ошибка сервера'
                    }
                ]
            }
        }
    }
}