import { AuthService, ResourceKey } from "@/services";
import { AppError, AppErrorKind, Result } from "@error";
import { useQuery } from "@tanstack/react-query";
import { Err, Ok } from "result";

const apiService = AuthService.new();

export function useGetMe() {
  const query = useQuery({
    queryKey: [ResourceKey.AuthUser],
    queryFn: args => apiService.getMe(args),
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
