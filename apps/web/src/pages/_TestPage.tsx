import { AppError, AppErrorKind } from "@/error";

export default function _TestPage() {
  throw AppError.new(AppErrorKind.BlockedError, `User not logged`); /// TODO: This is router level error
  return <div>_TestPage</div>;
}
