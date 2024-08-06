import { Result, ToString } from "./index";

export const Err = <E extends ToString>(value: E) => new Result<never, E>("err", value);
