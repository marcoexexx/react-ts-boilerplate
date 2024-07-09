type Action =
  | LocaleAction
  | CommonAction
  | TodoAction;

type ActionScope = Uppercase<`@@${keyof import("./index.tsx").Store}`>;

type ActionType<Key extends ActionScope, T extends string> = `${Key}/${T}`;
