/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

export default class Server {
  constructor(
    app: Application,
    configureRoutes: (app: Application) => void,
    errorMiddleware: (err: any, req: any, res: any, next: any) => void
  ) {
    this.config(app, configureRoutes, errorMiddleware); 
  }

  public config(
    app: Application,
    configureRoutes: (app: Application) => void,
    errorMiddleware: (err: any, req: any, res: any, next: any) => void
  ): void {
    app.use(express.json());
    app.use(morgan("common"));
    app.use(cors());
    app.use(urlencoded({ extended: true }));

    // Configure from Presentation layer
    configureRoutes(app);
    app.use(errorMiddleware);
  }
}
