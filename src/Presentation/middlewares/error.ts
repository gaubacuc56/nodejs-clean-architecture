/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException } from "@Domain/exceptions/root";
import { NextFunction, Response, Request } from "express";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    statusCode: error.statusCode,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
