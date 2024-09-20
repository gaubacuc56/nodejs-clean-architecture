import { IUserRepository } from "@Infrastructure/database/repository/user/interface";
import { IFindUserByIdRequest } from "@Application/dtos/request/user.req";
import { IUserService } from "./user.interface";
import { IFindUserResponse } from "@Application/DTOs/response/user.res";
import { pick } from "@Application/utils/pick";

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    public async findById(req: IFindUserByIdRequest) {
        const { id } = req;
        const user = await this.userRepository.findById(id);
        if (!user) return null;
        const res = pick(user, new Array<keyof IFindUserResponse>());
        return res;
    }
}
