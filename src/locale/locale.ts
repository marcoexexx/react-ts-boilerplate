import { getLocalStore, setLocalStore, strTemplate } from "@/utils";
import _get from "lodash/get";
import en, { Translations } from "./en";

const LOCAL_STORE_LANGUAGE_KEY = "language";

export const Locale = {
  US: "US",
} as const;
export type Locale = typeof Locale[keyof typeof Locale];

export const localString: Record<Locale, string> = {
  [Locale.US]: "English",
};

export type LocaleOptions = {
  [K: string]: string | undefined;
};

export type Localization = {
  translations: Record<Locale, Translations>;
  locale: Locale;
  t: (key: TxPath, options?: LocaleOptions) => string;
  load: (lang: Locale) => void;
};

export const localization: Localization = {
  translations: {
    [Locale.US]: en,
  },

  locale: getLocalStore<Locale>(LOCAL_STORE_LANGUAGE_KEY) || Locale.US,

  t(key, options) {
    const localePrefix = this.translations[this.locale];
    let msg = _get(localePrefix, key);
    if (options) msg = strTemplate(_get(localePrefix, key), options);
    return msg;
  },

  load(locale: Locale) {
    setLocalStore(LOCAL_STORE_LANGUAGE_KEY, locale);
    this.locale = locale;
  },
};

type RecusiveKeyOfHandleValue<TValue, Text extends string> = TValue extends
  any[] ? Text
  : TValue extends object ? `${Text}.${RecusiveKeyOf<TValue>}`
  : Text;

type RecusiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string)]: RecusiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & string];

export type TxPath = RecusiveKeyOf<Translations>;
