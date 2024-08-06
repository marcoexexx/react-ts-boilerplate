/**
 * Context type declaration
 */
type LocaleContextStore = {} & import("locale").Locale;

/**
 * Context action variants type declaration
 */
interface SetLocaleContextAction {
  type: ContextActionType<"@@LOCALE", "SET_LOCALE">;
  payload: import("locale").Locale;
}

/**
 * Main context action
 */
type LocaleContextAction = SetLocaleContextAction;
