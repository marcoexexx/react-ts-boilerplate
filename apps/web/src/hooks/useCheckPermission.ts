import { UserType } from "@/context/common";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "./useStore";

export function useCheckPermission(permInput: CheckPermissionInput): boolean {
  const { state } = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  const user = state.common.auth;

  useEffect(() => {
    // if (!user) navigate(`/status/failed-login`, { state: { from: location } });
    // TODO: fix user ctx
    if (!user) {
      console.log(`Not found user in ctx. /status/failed-login`, { state: { from: location } });
    }
  }, [user]);

  const isAllowed =
    (user?.role.permissions.some(perm =>
      perm.action === permInput.action && perm.resource === permInput.resource
    ) || user?.type === UserType.Superuser) ?? false;

  return isAllowed;
}
