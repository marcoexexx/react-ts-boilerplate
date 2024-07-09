import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";
import { initialLocaleStore, localeReducer } from "./locale";
import { initialTodoStore, todoReducer } from "./todo";

const initialStore = {
  // -- Settings
  locale: initialLocaleStore,

  common: initialCommonStore,
  todo: initialTodoStore,
  // more stores
};
export type Store = typeof initialStore;

function storeReducer(store: Store, action: Action): Store {
  const locale = action.type.startsWith("@@LOCALE" as ActionScope)
    ? localeReducer(store.locale, action as LocaleAction)
    : store.locale;

  const common = action.type.startsWith("@@COMMON" as ActionScope)
    ? commonReducer(store.common, action as CommonAction)
    : store.common;

  const todo = action.type.startsWith("@@TODO" as ActionScope)
    ? todoReducer(store.todo, action as TodoAction)
    : store.todo;

  // more reducer scopes

  return {
    locale,
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
