import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { pick } from "@Application/utils/pick";
import { BadRequestException } from "@Domain/exceptions/error-handler";


type Schema = {
  params?: ObjectSchema;
  query?: ObjectSchema;
  body?: ObjectSchema;
};
type RequestKey = "params" | "query" | "body";

export const validate =
  (schema: Schema) =>
    (req: Request, res: Response, next: NextFunction): void | NextFunction => {
      const validSchema = pick(schema, [
        "params",
        "query",
        "body",
      ] as RequestKey[]);
      const object = pick(req, Object.keys(validSchema) as RequestKey[]);
      const { value, error }: ValidationResult = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);

      if (error) {
        const errorMessage = error.details
          .map((details) => details.message)
          .join(", ");
        return next(new BadRequestException(errorMessage));
      }

      Object.assign(req, value);
      return next();
    };
