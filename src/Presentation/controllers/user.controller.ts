
import { RequestBody, ResponseBody } from "@Shared/types";
import { IUserService } from "@Application/features/user/user.interface";
import { asyncHandler } from "@Infrastructure/server/asyncHandler";

export class UserController {
    constructor(private readonly userService: IUserService) { }

    public findById = asyncHandler(async (req: RequestBody<{ id: string }>, res: ResponseBody) => {
        const _res = await this.userService.findById(req.body);
        res.json(_res);
    })
}
