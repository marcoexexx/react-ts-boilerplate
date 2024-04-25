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
  type: "SET_TODO_FILTER";
  payload: TodoFilterInput;
}

interface TodoPageAction {
  type: "SET_TODO_PAGE";
  payload: number;
}

interface TodoPageSizeAction {
  type: "SET_TODO_PAGE_SIZE";
  payload: number;
}

type TodoAction =
  | TodoFilterAction
  | TodoPageAction
  | TodoPageSizeAction;
