import { prismaClient } from "@Infrastructure/database/prisma";
import { IUserRepository } from "./interface";

export class UserRepository implements IUserRepository {
  public async findByEmail(email: string) {
    return await prismaClient.user.findFirst({ where: { email } });
  }

  public async findByResetKey(resetKey: string) {
    return await prismaClient.user.findFirst({
      where: { resetKey, resetKeyExpired: { gte: new Date() } },
    });
  }

  public async findById(id: number) {
    return await prismaClient.user.findFirst({ where: { id } });
  }

  public async createUser(data: {
    password: string;
    email: string;
    name: string;
  }) {
    return await prismaClient.user.create({ data });
  }

  public async updateResetKey(
    id: number,
    resetKey: string | null,
    resetKeyExpired: Date | null
  ) {
    await prismaClient.user.update({
      where: { id },
      data: { resetKey, resetKeyExpired },
    });
  }

  public async changePassword(id: number, password: string) {
    await prismaClient.user.update({
      where: { id },
      data: { password },
    });
  }
}
