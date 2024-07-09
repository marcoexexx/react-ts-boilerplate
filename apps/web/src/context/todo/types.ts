interface Todo {
  id: string;

  title: string;
  isCompleted: boolean;

  createdAt: string | Date;
  updatedAt: string | Date;
}

type TodoFilterInput = FilterPayload<Todo>;

/**
 * Context
 */
interface TodoStore {
  filter: TodoFilterInput;
}

interface TodoFilterAction {
  type: ActionType<"@@TODO", "SET_TODO_FILTER">;
  payload: TodoFilterInput;
}

/// TODO: pagination generic
interface TodoPageAction {
  type: ActionType<"@@TODO", "SET_TODO_PAGE">;
  payload: number;
}

interface TodoPageSizeAction {
  type: ActionType<"@@TODO", "SET_TODO_PAGE_SIZE">;
  payload: number;
}

type TodoAction =
  | TodoFilterAction
  | TodoPageAction
  | TodoPageSizeAction;
