import { UserType } from "@/context/common";
import { useStore } from "./useStore";

export function useCheckPermission(permInput?: CheckPermissionInput, strict = true): boolean {
  const { state } = useStore();

  if (!permInput) return !strict;

  const user = state.common.auth;

  return (user?.role?.permissions?.some(perm =>
    perm.action === permInput.action && perm.resource === permInput.resource
  ) || user?.type === UserType.Superuser) ?? false;
}
