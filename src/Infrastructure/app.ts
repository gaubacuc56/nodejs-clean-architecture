/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { config } from "./config";
import Server from "@Infrastructure/server/express";
import { errorMiddleware } from "@Presentation/middlewares/error";
import { configureRoutes } from "@Presentation/routes";

const app = express();

new Server(app, configureRoutes, errorMiddleware);

app
  .listen(config.PORT as number, function () {
    console.info(`Local is running on http://localhost:8000`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Server startup error: address already in use");
    } else {
      console.log(err);
    }
  });