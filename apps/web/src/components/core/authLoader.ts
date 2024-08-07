import { PermissionService, ResourceKey } from "@/services";
import { queryClient } from "./Providers";

const apiService = PermissionService.new();

export function AuthLoader() {
  return queryClient.fetchQuery({
    queryKey: [ResourceKey.AuthUser],
    queryFn: args => apiService.getMe(args),
    retry: 1,
  });
}
