import { userLoginFn } from "@/services/baseApi";
import { AppError, AppErrorKind, Result } from "@error";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Err, Ok } from "result";

export function useUserLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const mutation = useMutation({
    mutationFn: userLoginFn,
    onSuccess: () => {
      // TODO: display toast
      // dispatch({
      //   type: "OPEN_TOAST",
      //   payload: {
      //     message: "Success created a new brand.",
      //     severity: "success",
      //   },
      // });
      navigate(from, { replace: true });
    },
    onError: () => {
      // TODO: display toast
      // dispatch({
      //   type: "OPEN_TOAST",
      //   payload: {
      //     message: `failed: ${
      //       err?.response?.data?.message || err?.message || "Unknown error"
      //     }`,
      //     severity: "error",
      //   },
      // });
    },
  });

  const try_data: Result<typeof mutation.data> = !!mutation.error && mutation.isError
    ? Err(
      AppError.new((mutation.error as any).kind || AppErrorKind.ApiError, mutation.error.message),
    )
    : Ok(mutation.data);

  return { ...mutation, try_data };
}
