import { IChangePasswordRequest, IForgotPasswordRequest, ILoginRequest, IResetPasswordRequest, ISignUpRequest } from "@Application/DTOs/request/auth";
import { ILoginResponse, IRefreshTokenResponse, ISignUpResponse } from "@Application/DTOs/response/auth";
import { User } from "@Domain/entities/User";
import { Result } from "@Domain/result";
import { RequestBody } from "@Shared/types";

export interface IAuthService {
    login(req: ILoginRequest): Promise<Result<ILoginResponse>>;
    signup(req: ISignUpRequest): Promise<Result<ISignUpResponse>>;
    refreshToken(req: RequestBody<User>): Promise<Result<IRefreshTokenResponse>>;
    forgotPassword(req: IForgotPasswordRequest): Promise<Result>;
    resetPassword(req: IResetPasswordRequest): Promise<Result>;
    changePassword(req: IChangePasswordRequest & User): Promise<Result>;
}
