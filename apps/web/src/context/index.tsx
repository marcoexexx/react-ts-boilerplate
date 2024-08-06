import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";
import { initialLocaleStore, localeReducer } from "./locale";
import { initialPermissionStore, permissionReducer } from "./permission";

const initialStore = {
  // -- Settings
  locale: initialLocaleStore,
  common: initialCommonStore,

  // -- Resources
  permission: initialPermissionStore,
  // more stores
};
export type ContextStore = typeof initialStore;

function storeReducer(store: ContextStore, action: ContextAction): ContextStore {
  const handleReducer = <T, A>(
    scope: ContextActionScope,
    currentStore: T,
    reducer: (state: T, action: A) => T,
  ) =>
    action.type.startsWith(scope)
      ? reducer(currentStore, action as A)
      : currentStore;

  const locale = handleReducer("@@LOCALE", store.locale, localeReducer);
  const common = handleReducer("@@COMMON", store.common, commonReducer);
  const permission = handleReducer("@@PERMISSION", store.permission, permissionReducer);

  // more reducer scopes

  return {
    locale,
    common,
    permission,
    // more stores
  };
}

type ContextDispatch = (action: ContextAction) => void;

export const StoreContext = createContext<
  { state: ContextStore; dispatch: ContextDispatch } | undefined
>(undefined);

interface StoreProviderProps {
  children: React.ReactNode;
}

export function ContextStoreProvider(props: StoreProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(storeReducer, initialStore);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}
