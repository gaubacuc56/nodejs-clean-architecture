import { IUserRepository } from "@Infrastructure/database/repository/user/interface";
import { IFindUserByIdRequest } from "@Application/DTOs/request/user.req";
import { IFindUserResponse } from "@Application/DTOs/response/user.res";
import { IUserService } from "./user.interface";
import { Mapper } from "@Application/utils/mapper";

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    public async findById(req: IFindUserByIdRequest) {
        const { id } = req;
        const user = await this.userRepository.findById(id);
        if (!user) return null;
        const res = Mapper<IFindUserResponse>(user)
        return res;
    }
}
