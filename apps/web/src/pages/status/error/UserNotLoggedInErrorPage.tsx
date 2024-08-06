import { Navigate, useLocation } from "react-router-dom";

// TODO:
// throw UserNotLoggedIn and test.
export default function UserNotLoggedInErrorPage() {
  const location = useLocation();

  return <Navigate to={"/auth/sign-in"} state={location} />;
}
