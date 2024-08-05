type Action =
  | LocaleAction
  | CommonAction
  | TodoAction
  | PermissionAction;

type ActionScope = Uppercase<`@@${keyof import("./index").Store}`>;

type ActionType<Key extends ActionScope, T extends string> = `${Key}/${T}`;
