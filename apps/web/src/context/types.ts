type ContextAction =
  | LocaleContextAction
  | CommonContextAction
  | PermissionContextAction;

type ContextActionScope = Uppercase<`@@${keyof import("./index").ContextStore}`>;

type ContextActionType<Key extends ContextActionScope, T extends string> = `${Key}/${T}`;
