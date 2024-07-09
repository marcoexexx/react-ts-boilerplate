import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";
import { initialTodoStore, todoReducer } from "./todo";

const initialStore: Store = {
  common: initialCommonStore,
  todo: initialTodoStore,
  // more stores
};

function storeReducer(store: Store, action: Action): Store {
  const common = action.type.startsWith("@@COMMON" as ActionScope)
    ? commonReducer(store.common, action as CommonAction)
    : store.common;

  const todo = action.type.startsWith("@@TODO" as ActionScope)
    ? todoReducer(store.todo, action as TodoAction)
    : store.todo;

  // more reducer scopes

  return {
    common,
    todo,
    // more stores
  };
}

type Dispatch = (action: Action) => void;

export const StoreContext = createContext<
  { state: Store; dispatch: Dispatch } | undefined
>(undefined);

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
