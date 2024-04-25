import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";
import { initialTodoStore, todoReducer } from "./todo";

export type Store = {
  common: CommonStore;
  todo: TodoStore;
};
export type Action = {
  common: CommonAction;
  todo: TodoAction;
};

export type ActionKey = keyof Action;

const initialStore: Store = {
  common: initialCommonStore,
  todo: initialTodoStore,
};

function storeReducer(store: Store, action: Action): Store {
  return {
    common: commonReducer(store.common, action.common),
    todo: todoReducer(store.todo, action.todo),
  };
}

type Dispatch = (action: Action) => void;

export const StoreContext = createContext<
  { state: Store; dispatch: Dispatch } | undefined
>(undefined);

export function createAction(
  key: `${ActionKey}`,
  dispatch: Action[ActionKey],
) {
  return { [key]: dispatch };
}

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider(props: StoreProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(storeReducer, initialStore);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}
