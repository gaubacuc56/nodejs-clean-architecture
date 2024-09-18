
import { RequestBody, ResponseBody } from "@Shared/types";
import { IUserService } from "@Application/features/user/user.interface";
import { IFindUserByIdRequest } from "@Application/DTOs/request/user.req";
import { asyncHandler } from "@Infrastructure/server/asyncHandler";

export class UserController {
    constructor(private readonly userService: IUserService) { }

    public findById = asyncHandler(async (req: RequestBody<IFindUserByIdRequest>, res: ResponseBody) => {
        const _res = await this.userService.findById(req.body);
        res.json(_res);
    })
}
