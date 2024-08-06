import { useUserLogin } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { EnhancedButton } from "../common";
import { PasswordInputField } from "../common/input-fields";

export const signInUserSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  password: z.string({ required_error: "Password is required." }),
});
export type SignInUserInput = z.infer<typeof signInUserSchema>;

export function SignInUserForm() {
  // Handle API Mutation
  const mutation = useUserLogin();

  const { mutate, isPending, error } = mutation;

  // Handle form data validation and submit.
  const methods = useForm<SignInUserInput>({
    resolver: zodResolver(signInUserSchema),
  });

  useEffect(() => {
    if (error !== null) {
      setError("password", { type: "value", message: (error as any)?.response?.data?.message });
    }
  }, [error]);

  const { handleSubmit, register, formState: { errors }, setError } = methods;

  const onSubmit: SubmitHandler<SignInUserInput> = (value) => {
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
          label="Email"
          error={!!errors.email}
          helperText={!!errors.email ? errors.email.message : ""}
        />
        <PasswordInputField fieldName="password" />

        <EnhancedButton
          variant="contained"
          fullWidth
          type="submit"
          loading={isPending}
          loadingPosition="start"
          startIcon={<AccountCircleIcon />}
        >
          Sign In
        </EnhancedButton>
      </FormProvider>
    </Stack>
  );
}
