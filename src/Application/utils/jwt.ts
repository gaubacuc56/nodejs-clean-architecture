import * as jwt from "jsonwebtoken";
import { AUTH_ERRORS } from "@Application/common/constant/message";
import { config } from "@Infrastructure/config";
import {
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
} from "@Domain/common/constant/jwt";
import { HTTP_MSG } from "@Domain/common/constant/message";
import { UnauthorizedException } from "@Domain/exceptions/error-handler";
import { RequestBody } from "@Shared/types";

export const generateAccessToken = async (id: number) => {
    const token = jwt.sign(
        {
            userInfo: id,
        },
        config.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
    return token;
};

export const generateRefreshToken = async (id: number) => {
    const token = jwt.sign(
        {
            userInfo: id,
        },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );
    return token;
};

const verifyToken = async (token: string, type: string) => {
    return jwt.verify(token, type) as jwt.JwtPayload;
};

export const verifyAuthorizationHeader = async <T>(
    req: RequestBody<T>,
    tokenSecret: string
) => {
    const authorization = req.header("authorization");
    if (!authorization) {
        throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
    }

    const token = authorization.replace("Bearer ", "");
    if (!token) {
        throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
    }

    try {
        const payload = await verifyToken(token, tokenSecret);
        if (!payload) {
            throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
        }
        return payload;
    } catch (error) {
        throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
    }
};
