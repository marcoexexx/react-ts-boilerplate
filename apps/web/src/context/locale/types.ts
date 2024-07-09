/**
 * Context
 */
type LocaleStore = {} & import("locale").Locale;

interface SetLocaleAction {
  type: ActionType<"@@LOCALE", "SET_LOCALE">;
  payload: import("locale").Locale;
}

type LocaleAction = SetLocaleAction;
