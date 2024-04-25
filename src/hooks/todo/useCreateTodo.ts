import { queryClient } from "@/components/core";
import { ResourceKey } from "@/services/resourceKey";
import { TodoService } from "@/services/todo.service";
import AppError, { AppErrorKind } from "@/utils/exception";
import Result, { Err, Ok } from "@result";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useStore } from "..";

const apiService = TodoService.new();

export function useCreateTodo() {
  const { dispatch } = useStore();

  const navigate = useNavigate();
  const from = `/${ResourceKey.Todo}`;

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

  const try_data: Result<typeof mutation.data, AppError> =
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
