import { EnhancedButton } from "@/components/common";
import { PasswordInputField } from "@/components/common/input-fields";
import { useUserLogin } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

export const loginPasswordUserSchema = z.object({
  ident: z.string({ required_error: "User ident is required which is username or email." }),
  email: z.string({ required_error: "Email is required." }).email(),
  password: z.string({ required_error: "Password is required." }),
});
export type LoginPasswordUserInput = z.infer<typeof loginPasswordUserSchema>;

export type IdentEmail = { email?: string; ident?: string };

interface LoginPasswordUserFormProps {
  identEmail: IdentEmail;
  onEditEmail: () => void;
}

export function LoginPasswordUserForm(props: LoginPasswordUserFormProps) {
  const { identEmail, onEditEmail } = props;

  // Handle API Mutation
  const mutation = useUserLogin();
  const { mutate, isPending, error } = mutation;

  // Handle form data validation and submit.
  const methods = useForm<LoginPasswordUserInput>({
    resolver: zodResolver(loginPasswordUserSchema),
  });

  const { handleSubmit, register, formState: { errors }, setError, setValue } = methods;

  useEffect(() => {
    if (!!identEmail.email && !!identEmail.ident) {
      setValue("email", identEmail.email);
      setValue("ident", identEmail.ident);
    }
  }, [identEmail.email, identEmail.ident]);

  useEffect(() => {
    if (error !== null) {
      setError("password", { type: "value", message: (error as any)?.response?.data?.message });
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginPasswordUserInput> = (value) => {
    mutate(value);
  };

  return (
    <Stack
      px={3}
      gap={1}
      flexDirection="column"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <TextField
          {...register("email")}
          sx={{ display: "none" }}
          type="email"
        />
        <FormControl variant="outlined" fullWidth error={!!errors.ident}>
          <InputLabel htmlFor="ident">Username or email</InputLabel>
          <OutlinedInput
            disabled
            {...register("ident")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => onEditEmail()}
                  edge="end"
                >
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            }
            id="ident"
            label="Username or email"
          />
        </FormControl>

        <PasswordInputField fieldName="password" autoFocus={true} />

        <EnhancedButton
          variant="contained"
          fullWidth
          type="submit"
          loading={isPending}
          loadingPosition="start"
          startIcon={<AccountCircleIcon />}
        >
          Continue
        </EnhancedButton>
      </FormProvider>
    </Stack>
  );
}
