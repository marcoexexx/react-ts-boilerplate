import { todo } from "@error";
import { BaseService } from "./base.service";
import { baseApi } from "./baseApi";
import { ResourceKey } from "./resourceKey";

export class PermissionService extends BaseService<PermissionFilterInput, Permission> {
  constructor(public repo: ResourceKey) {
    super();
  }

  static new() {
    return new PermissionService(ResourceKey.Permission);
  }

  override async findMany(
    opt: QueryOptionArgs,
    { where, pagination, include }: PermissionFilterInput,
  ): Promise<HttpListResponse<Permission>> {
    console.log({ opt, where, pagination, include });
    throw todo(`PermissionService::findMany is not implamented.`);
  }

  async getMe(opt: QueryOptionArgs) {
    let url = `/auth/me`;
    let res = await baseApi.get<User>(url, {
      ...opt,
    });

    return res.data;
  }
}
