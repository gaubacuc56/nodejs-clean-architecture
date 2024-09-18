import { IFindUserByIdRequest } from "@Application/dtos/request/user.req";
import { IFindUserResponse } from "@Application/dtos/response/user.res";

export interface IUserService {
    findById(req: IFindUserByIdRequest): Promise<IFindUserResponse | null>;
}
