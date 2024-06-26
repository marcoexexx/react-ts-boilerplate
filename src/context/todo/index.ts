import { INITIAL_PAGINATION } from "@/services";
import AppError, { AppErrorKind } from "@/utils/exception";

export const initialTodoStore: TodoStore = {
  filter: {
    pagination: INITIAL_PAGINATION,
    include: undefined,
  },
};

export function todoReducer(
  store: TodoStore,
  action: TodoAction,
): TodoStore {
  switch (action.type) {
    case "@@TODO/SET_TODO_PAGE": {
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
    case "@@TODO/SET_TODO_PAGE_SIZE": {
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
    case "@@TODO/SET_TODO_FILTER": {
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
