import { LocaleOptions } from "./index";

export function strTemplate(str: string, context: LocaleOptions) {
  for (const key in context) {
    const value = context[key];
    const placeholder = `{{${key}}}`;
    if (value) str = str.replace(placeholder, value);
  }
  return str;
}
