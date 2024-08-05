import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";
import { initialLocaleStore, localeReducer } from "./locale";
import { initialPermissionStore, permissionReducer } from "./permission";
import { initialTodoStore, todoReducer } from "./todo";

const initialStore = {
  // -- Settings
  locale: initialLocaleStore,

  common: initialCommonStore,
  todo: initialTodoStore,
  permission: initialPermissionStore,
  // more stores
};
export type Store = typeof initialStore;

function storeReducer(store: Store, action: Action): Store {
  const handleReducer = <T, A>(
    scope: ActionScope,
    currentStore: T,
    reducer: (state: T, action: A) => T,
  ) =>
    action.type.startsWith(scope)
      ? reducer(currentStore, action as A)
      : currentStore;

  const locale = handleReducer("@@LOCALE", store.locale, localeReducer);
  const common = handleReducer("@@COMMON", store.common, commonReducer);
  const todo = handleReducer("@@TODO", store.todo, todoReducer);
  const permission = handleReducer("@@PERMISSION", store.permission, permissionReducer);

  // more reducer scopes

  return {
    locale,
    common,
    todo,
    permission,
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
