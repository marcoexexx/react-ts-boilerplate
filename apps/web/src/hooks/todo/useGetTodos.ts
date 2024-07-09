import { CacheResourcePageKey, ResourceKey } from "@/services";
import { TodoService } from "@/services/todo.service";
import { AppError, AppErrorKind, Result } from "@error";
import { Err, Ok } from "result";

import { useQuery } from "@tanstack/react-query";

const apiService = TodoService.new();

export function useGetTodos(filter: TodoFilterInput) {
  const query = useQuery({
    queryKey: [ResourceKey.Todo, filter] as CacheResourcePageKey<
      "todos",
      TodoFilterInput
    >["list"],
    queryFn: args => apiService.findMany(args, filter),
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
