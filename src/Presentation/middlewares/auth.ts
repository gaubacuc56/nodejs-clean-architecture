import { NextFunction, Response } from "express";
import { UnauthorizedException } from "@Domain/exceptions/error-handler";
import { config } from "@Infrastructure/config";
import { AUTH_ERRORS } from "@Application/common/constant/message";
import { verifyAuthorizationHeader } from "@Application/utils/jwt";
import { IFindUserResponse } from "@Application/DTOs/response/user";

import { serviceLocator } from "@Shared/service-locator";
import { RequestBody } from "@Shared/types";

interface IReAuthRequest<T> extends RequestBody<T> {
  body: T & IFindUserResponse;
}

export const authMiddleware = async <T>(
  req: IReAuthRequest<T>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = await verifyAuthorizationHeader(req, config.JWT_SECRET);

    const userService = serviceLocator.getUserService();
    const user = await userService.findById({ id: payload.userInfo });
    if (!user) next();
    else req.body = { ...req.body, ...user };
    next();
  } catch (error) {
    console.log("error", error);
    next(new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN));
  }
};
