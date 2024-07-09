import { AppError, AppErrorKind } from "@error";
import { Locale, localization } from "locale";

export const initialLocaleStore: Locale = localization.locale;

export function localeReducer(
  locale: Locale,
  action: LocaleAction,
): LocaleStore {
  switch (action.type) {
    case "@@LOCALE/SET_LOCALE": {
      return locale;
    }

    default: {
      const _unreachable: never = action.type;
      const message = "Unreachable action type";
      console.warn({ message, _unreachable });
      throw AppError.new(AppErrorKind.ContextError, message);
    }
  }
}
