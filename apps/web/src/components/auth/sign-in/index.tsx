import { useState } from "react";
import { AuthorizeUserForm } from "./AuthorizeUserForm";
import { IdentEmail, LoginPasswordUserForm } from "./LoginPasswordUserForm";

export function SignInUserForm() {
  const [identEmail, setIdentEmail] = useState<IdentEmail>({
    email: undefined,
    ident: undefined,
  });

  const handleSetEmail = (_identEmail: IdentEmail) => {
    setIdentEmail(() => _identEmail);
  };

  const handleEditEmail = () => {
    setIdentEmail(identEmail => ({ ...identEmail, email: undefined }));
  };

  return (
    <>
      {!!identEmail.email
        ? <LoginPasswordUserForm identEmail={identEmail} onEditEmail={handleEditEmail} />
        : <AuthorizeUserForm identEmail={identEmail} setIdentEmail={handleSetEmail} />}
    </>
  );
}
