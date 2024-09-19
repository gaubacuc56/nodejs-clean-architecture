import { Router } from "express";
import { AsyncRoute } from "@Infrastructure/server/catchAsync";
import { UserRepository } from "@Infrastructure/database/repository/user";
import { UserService } from "@Application/features/user/user.service";
import { UserController } from "@Presentation/controllers/user.controller";
import { authMiddleware } from "@Presentation/middlewares/auth";

class UserRoutes extends AsyncRoute {
  public router = Router();
  private userController: UserController;

  constructor() {
    super();
    // Dependency injection of services
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    this.userController = this.CatchAsync(new UserController(userService));
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router
      .route("/")
      .get([authMiddleware], this.userController.findById);
  }
}

export default new UserRoutes().router;
