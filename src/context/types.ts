type Store = {
  common: CommonStore;
  todo: TodoStore;
};
type Action =
  | CommonAction
  | TodoAction;

type ActionScope = Uppercase<`@@${keyof Store}`>;

type ActionType<Key extends ActionScope, T extends string> = `${Key}/${T}`;
