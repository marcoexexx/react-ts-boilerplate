import { UserType } from "@/context/common";

export function useCheckPermission(
  user: User | undefined,
  permInput?: CheckPermissionInput,
  strict = true,
): boolean {
  if (!permInput || !user) return !strict; // TODO: Guest user permission.

  return (user.role?.permissions.some(perm =>
    perm.action === permInput.action && perm.resource === permInput.resource
  ) || user.type === UserType.Superuser) ?? false;
}
