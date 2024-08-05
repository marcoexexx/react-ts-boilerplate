import {
  CacheResourcePageKey,
  PermissionService,
  ResourceKey,
} from "@/services";
import { AppError, AppErrorKind, Result } from "@error";
import { Err, Ok } from "result";

import { useQuery } from "@tanstack/react-query";

const apiService = PermissionService.new();

export function useGetPermissions(filter: PermissionFilterInput) {
  const query = useQuery({
    queryKey: [ResourceKey.Permission, filter] as CacheResourcePageKey<
      "permissions",
      PermissionFilterInput
    >["list"],
    queryFn: () => apiService.getUserPermission(),
    select: data => data,
  });

  const try_data: Result<typeof query.data> =
    !!query.error && query.isError
      ? Err(
        AppError.new(
          (query.error as any).kind || AppErrorKind.ApiError,
          query.error.message,
        ),
      )
      : Ok(query.data);

  return {
    ...query,
    try_data,
  };
}
