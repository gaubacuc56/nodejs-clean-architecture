import { MoreThanOrEqual, Repository } from 'typeorm'
import { AppRepository } from "@Infrastructure/database/data-source";
import { User } from "@Domain/entities/User";
import { IUserRepository } from "./interface";
export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppRepository(User)
  }

  public async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async findByResetKey(resetKey: string) {
    return await this.userRepository.findOne({
      where: {
        resetKey,
        resetKeyExpired: MoreThanOrEqual(new Date()),
      },
    });
  }

  public async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async createUser(data: {
    password: string;
    email: string;
    name: string;
  }) {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  public async updateResetKey(
    id: string,
    resetKey: string | undefined,
    resetKeyExpired: Date | undefined
  ) {
    await this.userRepository.update(id, { resetKey, resetKeyExpired });
  }

  public async changePassword(id: string, password: string) {
    await this.userRepository.update(id, { password });
  }
}
