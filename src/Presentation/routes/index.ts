import { Application } from "express";
import AuthRoutes from "./auth.routes";
import AppCommonRoutes from "./app-common.routes";
import UserRoutes from "./user.routes";

export const configureRoutes = (app: Application) => {
  app.use("/app", AppCommonRoutes);
  app.use("/api/auth", AuthRoutes);
  app.use("/api/user", UserRoutes);
};
