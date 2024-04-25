import { createContext, useReducer } from "react";
import { commonReducer, initialCommonStore } from "./common";

export type Store = {
  common: CommonStore;
};
export type Action = {
  common: CommonAction;
};

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

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider(props: StoreProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(storeReducer, initialStore);

  const value = { state, dispatch };

  type Key = keyof typeof initialStore;
  const createAction = (key: `${Key}`, dispatch: Action[Key]) => ({
    [key]: dispatch,
  });
  dispatch(createAction("common", { type: "CLOSE_TOAST" }));

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}
