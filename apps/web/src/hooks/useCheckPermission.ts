import { UserType } from "@/context/common";
import { useStore } from "./useStore";

export function useCheckPermission(permInput: CheckPermissionInput): boolean {
  const { state } = useStore();

  const user = state.common.auth;

  const isAllowed =
    (user?.role?.permissions?.some(perm =>
      perm.action === permInput.action && perm.resource === permInput.resource
    ) || user?.type === UserType.Superuser) ?? false;

  return isAllowed;
}
