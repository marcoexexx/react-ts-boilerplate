/**
 * Context
 */
type LocaleStore = {} & import("locale").Locale;

interface SetLocaleAction {
  type: ActionType<"@@LOCALE", "SET_LOCALE">;
  payload: TodoFilterInput;
}

type LocaleAction = SetLocaleAction;
