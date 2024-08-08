import { AppError, AppErrorKind } from "@/error";
import { useCheckPermission, useStore } from "@/hooks";
import { useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";

interface WithGuardProps {
  allowed: boolean;
}

export function withGuard<Props extends {}>(
  WrappedComponent: React.ComponentType<Props & WithGuardProps>,
  permission?: CheckPermissionInput,
  safe = false,
) {
  const ComponentWithGuard = (props: Props) => {
    const user = useRouteLoaderData("root") as User | undefined;
    const { dispatch } = useStore();

    const isAllowed = useCheckPermission(user, permission, false);

    useEffect(() => {
      if (user) dispatch({ type: "@@COMMON/SIGN_USER", payload: user });
      else throw AppError.new(AppErrorKind.ContextError, `User not found in context.`);
    }, [user]);

    const comp = <WrappedComponent {...props} allowed={isAllowed} />;

    if (safe) return comp;
    else if (isAllowed) return comp;
    else throw AppError.new(AppErrorKind.AccessDeniedError, `This page need permission.`);
  };

  return ComponentWithGuard;
}
