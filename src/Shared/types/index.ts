/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";

// Common type for a typed request
export type RequestBody<TBody = {}, TParams = {}, TQuery = {}> = Request<TParams, any, TBody, TQuery>;

// Common type for a typed response
export type ResponseBody<TResBody = any> = Response<TResBody>;
