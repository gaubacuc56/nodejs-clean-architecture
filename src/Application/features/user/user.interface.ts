import { IFindUserByIdRequest } from "@Application/DTOs/request/user.req";
import { IFindUserResponse } from "@Application/DTOs/response/user.res";

export interface IUserService {
    findById(req: IFindUserByIdRequest): Promise<IFindUserResponse | null>;
}
