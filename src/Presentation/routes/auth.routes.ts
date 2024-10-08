import { Router } from "express";
import { authValidation } from "@Application/features/auth/validation";
import { AuthController } from "@Presentation/controllers/auth.controller";
import { authMiddleware } from "@Presentation/middlewares/auth";
import { validate } from "@Presentation/middlewares/validate";
import { serviceLocator } from "@Shared/service-locator";
import { AsyncRoute } from "@Infrastructure/server/catchAsync";
class AuthRoutes extends AsyncRoute {
  public router = Router();
  private authController: AuthController;

  constructor() {
    super()
    const authService = serviceLocator.getAuthService();
    this.authController = this.CatchAsync(new AuthController(authService));
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router
      .route("/login")
      .post([validate(authValidation.login)], this.authController.login);

    this.router
      .route("/signup")
      .post([validate(authValidation.signup)], this.authController.signup);

    this.router
      .route("/forgot-password")
      .post(
        [validate(authValidation.forgotPassword)],
        this.authController.forgotPassword
      );

    this.router
      .route("/reset-password")
      .post(
        [validate(authValidation.resetPassword)],
        this.authController.resetPassword
      );

    this.router
      .route("/change-password")
      .put(
        [authMiddleware, validate(authValidation.changePassword)],
        this.authController.changePassword
      );

    this.router.route("/me").get([authMiddleware], this.authController.me);
    this.router.route("/refresh-token").post(this.authController.refreshToken);
  }
}

export default new AuthRoutes().router;
