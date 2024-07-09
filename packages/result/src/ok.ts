import { Result } from "./index";

export const Ok = <T>(value: T) => new Result<T, never>("ok", value);
