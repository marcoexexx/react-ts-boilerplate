import { AppError, AppErrorKind } from "@/error";
import { useCheckPermission } from "@/hooks";

interface WithGuardProps {
  allowed: boolean;
}

export function withGuard<Props extends {}>(
  permission: CheckPermissionInput,
  WrappedComponent: React.ComponentType<Props & WithGuardProps>,
  safe = false,
) {
  const ComponentWithGuard = (props: Props) => {
    let isAllowed = useCheckPermission(permission);

    let comp = <WrappedComponent {...props} allowed={isAllowed} />;

    if (safe) return comp;
    else if (isAllowed) return comp;
    else throw AppError.new(AppErrorKind.AccessDeniedError, `This page need permission.`);
  };

  return ComponentWithGuard;
}
