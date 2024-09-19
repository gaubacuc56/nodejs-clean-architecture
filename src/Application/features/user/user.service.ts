import { IUserRepository } from "@Infrastructure/database/repository/user/interface";
import { IFindUserByIdRequest } from "@Application/dtos/request/user.req";
import { IUserService } from "./user.interface";

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    public async findById(req: IFindUserByIdRequest) {
        const { id } = req;
        console.log("req", req);

        console.log('id', id)
        return await this.userRepository.findById(id);
    }
}
