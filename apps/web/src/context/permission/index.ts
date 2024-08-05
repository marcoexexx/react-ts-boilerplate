import { INITIAL_PAGINATION } from "@/services";
import { AppError, AppErrorKind } from "@error";

export const initialPermissionStore: PermissionStore = {
  filter: {
    pagination: INITIAL_PAGINATION,
    include: undefined,
  },
};

export function permissionReducer(
  store: PermissionStore,
  action: PermissionAction,
): PermissionStore {
  switch (action.type) {
    case "@@PERMISSION/SET_PERMISSION_PAGE": {
      return {
        ...store,
        filter: {
          ...store.filter,
          pagination: {
            pageSize: store.filter.pagination?.pageSize
              || INITIAL_PAGINATION.pageSize,
            page: action.payload,
          },
        },
      };
    }
    case "@@PERMISSION/SET_PERMISSION_PAGE_SIZE": {
      return {
        ...store,
        filter: {
          ...store.filter,
          pagination: {
            pageSize: action.payload,
            page: store.filter.pagination?.page
              || INITIAL_PAGINATION.pageSize,
          },
        },
      };
    }
    case "@@PERMISSION/SET_PERMISSION_FILTER": {
      return {
        ...store,
        filter: action.payload,
      };
    }

    default: {
      const _unreachable: never = action;
      const message = "Unreachable action type";
      console.warn({ message, _unreachable });
      throw AppError.new(AppErrorKind.ContextError, message);
    }
  }
}
