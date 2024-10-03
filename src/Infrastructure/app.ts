/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { config } from "./config";
import Server from "@Infrastructure/server/express";
import { errorMiddleware } from "@Presentation/middlewares/error";
import { configureRoutes } from "@Presentation/routes";
import { AppDataSource } from "./database/data-source";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    // Start the server once the database is connected
    new Server(app, configureRoutes, errorMiddleware);

    app
      .listen(config.PORT as number, () => {
        console.info(`Server is running on http://localhost:${config.PORT}`);
      })
      .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          console.log("Server startup error: address already in use");
        } else {
          console.log(err);
        }
      });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
