import { queryClient } from "@/components/core";
import { ResourceKey, TodoService } from "@/services";
import { AppError, AppErrorKind, Result } from "@error";
import { useMutation } from "@tanstack/react-query";
import { Err, Ok } from "result";

const apiService = TodoService.new();

export function useCreateTodo() {
  const mutation = useMutation({
    mutationFn: (...args: Parameters<typeof apiService.create>) =>
      apiService.create(...args),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ResourceKey.Todo],
      });
    },
    onError: () => {
    },
  });

  const try_data: Result<typeof mutation.data> =
    !!mutation.error && mutation.isError
      ? Err(
        AppError.new(
          (mutation.error as any).kind || AppErrorKind.ApiError,
          mutation.error.message,
        ),
      )
      : Ok(mutation.data);

  return { ...mutation, try_data };
}
