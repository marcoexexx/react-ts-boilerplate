import { BaseService } from "./base.service";
import { baseApi } from "./baseApi";
import { ResourceKey } from "./resourceKey";

export class PermissionService
  extends BaseService<PermissionFilterInput, Permission>
{
  constructor(public repo: ResourceKey) {
    super();
  }

  static new() {
    return new PermissionService(ResourceKey.Permission);
  }

  async getUserPermission() {
    let res = await baseApi.get<HttpListResponse<Permission>>(
      `/api/auth/permission?action=${"Read"}&resource=${"Task"}`,
    );
    return res.data;
  }
}
