import 'reflect-metadata';
import { IUserRepository } from "@Infrastructure/database/repository/user/interface";
import { IFindUserResponse } from "@Application/DTOs/response/user";
import { IUserService } from "./user.interface";
import { Result } from "@Domain/result";
import { Mapper } from "@Infrastructure/mapper";
export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    public async findById(req: { id: string }) {
        const { id } = req;
        const user = await this.userRepository.findById(id);
        return new Result({
            data: user ? Mapper(IFindUserResponse, user) : null
        });
    }
}
