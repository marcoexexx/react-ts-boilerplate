import { PermissionService, ResourceKey } from "@/services";
import { AppError, AppErrorKind, Result } from "@error";
import { useQuery } from "@tanstack/react-query";
import { Err, Ok } from "result";

const apiService = PermissionService.new();

export function useGetUserPermissions(params: CheckPermissionInput) {
  const query = useQuery({
    queryKey: [ResourceKey.UserPermission, params],
    queryFn: args => apiService.getUserPermission(args, params),
    select: data => data,
  });

  const try_data: Result<typeof query.data> = !!query.error && query.isError
    ? Err(AppError.new((query.error as any).kind || AppErrorKind.ApiError, query.error.message))
    : Ok(query.data);

  return {
    ...query,
    try_data,
  };
}
