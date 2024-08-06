interface Permission {
  id: string;

  action: import("./index").PermissionAction;
  resource: import("./index").PermissionResource;

  createdAt: string | Date;
  updatedAt: string | Date;
}

type CheckPermissionInput = Pick<Permission, "action" | "resource">;

type PermissionFilterInput = FilterPayload<Permission>;

/**
 * Context type declaration
 */
interface PermissionContextStore {
  filter: PermissionFilterInput;
}

/**
 * Context action variants type declaration
 */
interface PermissionFilterContextAction {
  type: ContextActionType<"@@PERMISSION", "SET_PERMISSION_FILTER">;
  payload: PermissionFilterInput;
}

/// TODO: pagination generic
interface PermissionPageContextAction {
  type: ContextActionType<"@@PERMISSION", "SET_PERMISSION_PAGE">;
  payload: number;
}

interface PermissionPageSizeContextAction {
  type: ContextActionType<"@@PERMISSION", "SET_PERMISSION_PAGE_SIZE">;
  payload: number;
}

/**
 * Main context action
 */
type PermissionContextAction =
  | PermissionFilterContextAction
  | PermissionPageContextAction
  | PermissionPageSizeContextAction;
