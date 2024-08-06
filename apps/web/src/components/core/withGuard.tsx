import { AppError, AppErrorKind } from "@/error";
import { useGetUserPermissions } from "@/hooks";
import { SuspenseLoader } from "./SuspenseLoader";

interface WithGuardProps {
  allowed: boolean;
}

export function withGuard<Props extends {}>(
  permission: CheckPermissionInput,
  WrappedComponent: React.ComponentType<Props & WithGuardProps>,
  safe = false,
) {
  const ComponentWithGuard = (props: Props) => {
    let { try_data, isLoading } = useGetUserPermissions(permission);

    let data = try_data.ok_or_throw();
    let isAllowed = data?.results.some(p =>
      p.action === permission.action
      && p.resource === permission.resource
    ) ?? false;

    let comp = <WrappedComponent {...props} allowed={isAllowed} />;

    if (isLoading) return <SuspenseLoader />;

    if (safe) return comp;
    else if (isAllowed) return comp;
    else {throw AppError.new(
        AppErrorKind.AccessDeniedError,
        `This page need permission.`,
      );}
  };

  return ComponentWithGuard;
}
