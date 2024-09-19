/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { NextFunction, Response, Request } from "express";
import { InternalServerErrorException } from "@Domain/exceptions/error-handler";
import { HttpException } from "@Domain/exceptions/root";

const handleException = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      console.log("error", error);
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalServerErrorException("An unexpected error occurred");
      }
      next(exception);
    }
  };
};

export class AsyncRoute {
  /**
   * Handling unexpected error in controller.
   */
  protected CatchAsync<T extends object>(controller: T): T {
    // Get all prototypes of the controller to access its methods
    const prototype = Object.getPrototypeOf(controller);

    Object.getOwnPropertyNames(prototype).forEach((key) => {
      // Check if the descriptor exists and its value is a function (i.e., a method)
      const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
      if (descriptor && typeof descriptor.value === "function") {
        // Wrap the method with error-handling logic and reassign it to the controller
        (controller as any)[key] = handleException(descriptor.value);
      }
    });

    return controller;
  }
}
