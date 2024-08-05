import { AppError, AppErrorKind } from "@/error";
import { useGetPermissions } from "@/hooks";
import { SuspenseLoader } from "./SuspenseLoader";

interface WithGuardProps {
  allowed: boolean;
}

export function withGuard<Props extends {}>(
  WrappedComponent: React.ComponentType<Props & WithGuardProps>,
  permission: Pick<Permission, "action" | "resource">,
  safe = true,
) {
  const ComponentWithGuard = (props: Props) => {
    let { try_data, isLoading } = useGetPermissions({});

    let data = try_data.ok_or_throw();
    let isAllowed = data?.results.some(p =>
      p.action === permission.action
      && p.resource === permission.resource
    ) ?? false;

    let comp = <WrappedComponent {...props} allowed={true} />;

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
