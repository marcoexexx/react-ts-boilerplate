import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";

export type Store = {
  common: CommonStore;
};
export type Action = {
  common: CommonAction;
};

export type ActionKey = keyof Action;

const initialStore: Store = {
  common: initialCommonStore,
};

function storeReducer(store: Store, action: Action): Store {
  return {
    common: commonReducer(store.common, action.common),
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
