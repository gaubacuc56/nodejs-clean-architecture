import { AuthService } from "@Application/features/auth/auth.service";
import { UserService } from "@Application/features/user/user.service";
import { UserRepository } from "@Persistence/repository/user";

class ServiceLocator {
  private userService: UserService | null = null;
  private authService: AuthService | null = null;

  public getUserService(): UserService {
    if (!this.userService) {
      const userRepository = new UserRepository();
      this.userService = new UserService(userRepository);
    }
    return this.userService;
  }

  public getAuthService(): AuthService {
    if (!this.authService) {
      const userRepository = new UserRepository();
      this.authService = new AuthService(userRepository);
    }
    return this.authService;
  }
}

export const serviceLocator = new ServiceLocator();
