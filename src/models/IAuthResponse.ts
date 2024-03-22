import { IApiResponse } from "./IApiResponse";
import { ITokenData } from "./ITokenResponse";

export interface IAuthResponse extends IApiResponse {
    data: ITokenData;
}

export interface IErrorResponse extends IApiResponse {
    errors: string[];
}
