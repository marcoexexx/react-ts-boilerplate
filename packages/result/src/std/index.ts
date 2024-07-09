import { Result } from "..";

export const tryJSONParse = Result.try(JSON.parse);
export const tryJSONStringify = Result.try(JSON.stringify);

export const tryParseInt = Result.try(parseInt);
