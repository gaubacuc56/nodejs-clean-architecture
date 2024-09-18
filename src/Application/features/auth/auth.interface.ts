import { User } from "@prisma/client";
import { IChangePasswordRequest, IForgotPasswordRequest, ILoginRequest, IResetPasswordRequest, ISignUpRequest } from "@Application/dtos/request/auth.req";
import { ILoginResponse, IRefreshTokenResponse, ISignUpResponse } from "@Application/dtos/response/auth.res";
import { RequestBody } from "@Shared/types";

export interface IAuthService {
    login(req: ILoginRequest): Promise<ILoginResponse>;
    signup(req: ISignUpRequest): Promise<ISignUpResponse>;
    refreshToken(req: RequestBody<User>): Promise<IRefreshTokenResponse>;
    forgotPassword(req: IForgotPasswordRequest): Promise<{ message: string }>;
    resetPassword(req: IResetPasswordRequest): Promise<{ message: string }>;
    changePassword(req: IChangePasswordRequest & User): Promise<{ message: string }>;
}
