import { User } from "@prisma/client";
import { IChangePasswordRequest, IForgotPasswordRequest, ILoginRequest, IResetPasswordRequest, ISignUpRequest } from "@Application/dtos/request/auth.req";
import { ILoginResponse, IRefreshTokenResponse, ISignUpResponse } from "@Application/dtos/response/auth.res";
import { RequestBody } from "@Shared/types";

export interface ITaskService {
    login(req: ILoginRequest): Promise<ILoginResponse>;
    create() : Promis
}
