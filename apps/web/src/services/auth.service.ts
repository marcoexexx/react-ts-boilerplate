import { SignInUserInput } from "@/components/auth";
import { BaseService } from "./base.service";
import { baseApi } from "./baseApi";
import { ResourceKey } from "./resourceKey";

type AccessTokenResponse = { accessToken: string };

export class AuthService extends BaseService<PermissionFilterInput, Permission> {
  constructor(public repo: ResourceKey) {
    super();
  }

  static new() {
    return new AuthService(ResourceKey.AuthUser);
  }

  async getMe(opt: QueryOptionArgs) {
    const url = `/auth/me`;
    const res = await baseApi.get<User>(url, { ...opt });

    return res.data;
  }

  static async refreshAccessToken() {
    const url = "auth/refresh-token";
    const res = await baseApi.post<AccessTokenResponse>(url);

    return res.data;
  }

  static async userLogin(user: SignInUserInput) {
    const url = "auth/login";
    const res = await baseApi.post<AccessTokenResponse>(url, user);

    return res.data;
  }
}
