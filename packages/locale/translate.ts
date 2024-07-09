import { localization, TxPath } from "./locale";

export function translate(key: TxPath) {
  return localization.t(key);
}
