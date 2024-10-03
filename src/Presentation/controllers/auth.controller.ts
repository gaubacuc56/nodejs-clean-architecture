
import { RequestBody, ResponseBody } from "@Shared/types";
import {
    ILoginRequest,
    ISignUpRequest,
    IForgotPasswordRequest,
    IResetPasswordRequest,
    IChangePasswordRequest,
} from "@Application/DTOs/request/auth.req";
import { IAuthService } from "@Application/features/auth/auth.interface";
import { asyncHandler } from "@Infrastructure/server/asyncHandler";
import { User } from "@Domain/entities/User";

export class AuthController {
    constructor(private readonly authService: IAuthService) { }

    public login = asyncHandler(async (req: RequestBody<ILoginRequest>, res: ResponseBody) => {
        const _res = await this.authService.login(req.body);
        res.json(_res);
    })

    public signup = asyncHandler(async (req: RequestBody<ISignUpRequest>, res: ResponseBody) => {
        const _res = await this.authService.signup(req.body);
        res.json(_res);
    })

    public me = asyncHandler(async (req: RequestBody<User>, res: ResponseBody) => {
        res.json(req.body);
    })

    public refreshToken = asyncHandler(async (req: RequestBody<User>, res: ResponseBody) => {
        const _res = await this.authService.refreshToken(req);
        res.json(_res);
    })

    public forgotPassword = asyncHandler(async (
        req: RequestBody<IForgotPasswordRequest>,
        res: ResponseBody
    ) => {
        const _res = await this.authService.forgotPassword(req.body);
        res.json(_res);
    })

    public resetPassword = asyncHandler(async (
        req: RequestBody<IResetPasswordRequest>,
        res: ResponseBody
    ) => {
        const _res = await this.authService.resetPassword(req.body);
        res.json(_res);
    })

    public changePassword = asyncHandler(async (
        req: RequestBody<IChangePasswordRequest & User>,
        res: ResponseBody
    ) => {
        const _res = await this.authService.changePassword(req.body);
        res.json(_res);
    })
}
