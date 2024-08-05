interface Permission {
  id: string;

  action:
    | "create"
    | "read"
    | "update"
    | "delete";
  resource: import("@/services").ResourceKey;

  createdAt: string | Date;
  updatedAt: string | Date;
}

type PermissionFilterInput = FilterPayload<Permission>;

/**
 * Context
 */
interface PermissionStore {
  filter: PermissionFilterInput;
}

interface PermissionFilterAction {
  type: ActionType<"@@PERMISSION", "SET_PERMISSION_FILTER">;
  payload: PermissionFilterInput;
}

/// PERMISSION: pagination generic
interface PermissionPageAction {
  type: ActionType<"@@PERMISSION", "SET_PERMISSION_PAGE">;
  payload: number;
}

interface PermissionPageSizeAction {
  type: ActionType<"@@PERMISSION", "SET_PERMISSION_PAGE_SIZE">;
  payload: number;
}

type PermissionAction =
  | PermissionFilterAction
  | PermissionPageAction
  | PermissionPageSizeAction;
