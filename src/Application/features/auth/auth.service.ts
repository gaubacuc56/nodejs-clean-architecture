import { AUTH_ERRORS } from "@Application/common/constant/message";
import {
    ILoginRequest,
    ISignUpRequest,
    IForgotPasswordRequest,
    IResetPasswordRequest,
    IChangePasswordRequest,
} from "@Application/dtos/request/auth.req";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAuthorizationHeader,
} from "@Application/utils/jwt";
import { transporter } from "@Application/utils/send-mail";
import {
    BadRequestException,
    UnauthorizedException,
} from "@Domain/exceptions/error-handler";
import { RequestBody } from "@Shared/types";
import { compareSync, hashSync } from "bcrypt";
import crypto from "crypto";
import { config } from "@Infrastructure/config";
import { IAuthService } from "./auth.interface";
import { IUserRepository } from "@Infrastructure/database/repository/user/interface";
import { pick } from "@Application/utils/pick";
import { ISignUpResponse } from "@Application/DTOs/response/auth.res";
import { User } from "@Domain/entities/User";

export class AuthService implements IAuthService {
    constructor(private readonly userRepository: IUserRepository) { }

    public async login(req: ILoginRequest) {
        const { email, password } = req;

        const user = await this.userRepository.findByEmail(email);
        if (user == null) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
        } else {
            const isValidPassword = compareSync(password, user.password);
            if (!isValidPassword) {
                throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
            }

            const token = await generateAccessToken(user.id);
            const refreshToken = await generateRefreshToken(user.id);
            return { token, refreshToken };
        }
    }

    public async signup(req: ISignUpRequest) {
        const { email } = req;
        let user = await this.userRepository.findByEmail(email);
        if (user) throw new BadRequestException(AUTH_ERRORS.EXISTED_USER);

        user = await this.userRepository.createUser({
            ...req,
            password: hashSync(req.password, 10),
        });

        // Only return ISignUpResponse properties
        const res = pick(user, new Array<keyof ISignUpResponse>());
        return res;
    }

    public async refreshToken(req: RequestBody<User>) {
        const payload = await verifyAuthorizationHeader(
            req,
            config.REFRESH_TOKEN_SECRET
        );

        if (!payload) throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);

        const token = await generateAccessToken(req.body.id);

        const refreshToken = await generateRefreshToken(req.body.id);
        return { token, refreshToken };
    }

    public async forgotPassword(req: IForgotPasswordRequest) {
        const { email } = req;
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new BadRequestException(AUTH_ERRORS.USER_NOT_FOUND);

        const resetKey =
            crypto.randomBytes(32).toString("hex") + new Date().valueOf();
        const resetKeyExpired = new Date(Date.now() + 60000); // expire in 1 minute

        await this.userRepository.updateResetKey(
            user.id,
            resetKey,
            resetKeyExpired
        );

        const resetUrl = `${config.CLIENT_DOMAIN}/auth/reset-password?resetKey=${resetKey}`;

        await transporter.sendMail({
            from: '"Toan" <thaitoan3039015@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset your password", // Subject line
            html: `<p>Follow this link to reset your password: \n ${resetUrl}</p>`, // html body
        });
        return { message: "Password reset email sent" };
    }

    public async resetPassword(req: IResetPasswordRequest) {
        const { resetKey, newPassword } = req;
        const user = await this.userRepository.findByResetKey(resetKey);

        if (!user) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_TOKEN);
        }

        const isOldPassword = compareSync(newPassword, user.password);

        if (isOldPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await this.userRepository.changePassword(
            user.id,
            hashSync(newPassword, 10)
        );
        await this.userRepository.updateResetKey(user.id, null, null);

        return { message: "Password reset successful" };
    }

    public async changePassword(req: IChangePasswordRequest & User) {
        const { id, password, oldPassword, newPassword } = req;

        const isOldPasswordValid = compareSync(oldPassword, password);

        if (!isOldPasswordValid) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_PASSWORD);
        }

        if (oldPassword === newPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await this.userRepository.changePassword(id, hashSync(newPassword, 10));

        return { message: "Change password successful" };
    }
}
