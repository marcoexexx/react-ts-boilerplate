import { EnhancedButton, EnhancedText } from "@/components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { IdentEmail } from "./LoginPasswordUserForm";

import { AuthService } from "@/services";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMutation } from "@tanstack/react-query";

export const authorizeUserSchema = z.object({
  ident: z.string({ required_error: "User identity is required which is username or email." }),
});
export type AuthorizeUserInput = z.infer<typeof authorizeUserSchema>;

interface AuthorizeUserFormProps {
  identEmail: IdentEmail;
  setIdentEmail: ({ email, ident }: IdentEmail) => void;
}

export function AuthorizeUserForm(props: AuthorizeUserFormProps) {
  const { identEmail, setIdentEmail } = props;

  const identRef = useRef<string | null>(null);

  // Handle API Mutation
  const mutation = useMutation({
    mutationFn: AuthService.userAuthorize,
    onSuccess: ({ email }) => {
      // TODO: display toast
      // dispatch({
      //   type: "OPEN_TOAST",
      //   payload: {
      //     message: "Success created a new brand.",
      //     severity: "success",
      //   },
      // });

      if (identRef.current) {
        setIdentEmail({
          ident: identRef.current,
          email,
        });
      }
    },
    onError: (err: any) => {
      // TODO: display toast
      // dispatch({
      //   type: "OPEN_TOAST",
      //   payload: {
      //     message: `failed: ${
      //       err?.response?.data?.message || err?.message || "Unknown error"
      //     }`,
      //     severity: "error",
      //   },
      // });
      setError("ident", { type: "value", message: err?.response?.data?.message });
    },
  });
  const { mutate, isPending } = mutation;

  // Handle form data validation and submit.
  const methods = useForm<AuthorizeUserInput>({
    resolver: zodResolver(authorizeUserSchema),
  });

  const { handleSubmit, register, formState: { errors }, setValue, setError } = methods;

  useEffect(() => {
    if (identEmail.ident) setValue("ident", identEmail.ident);
  }, [identEmail.ident]);

  const onSubmit: SubmitHandler<AuthorizeUserInput> = (val) => {
    identRef.current = val.ident;

    mutate(val.ident);
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
          {...register("ident")}
          label="Username or email"
          error={!!errors.ident}
        />

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

        <EnhancedText
          sx={{
            color: (theme) => theme.colors.error.main,
            maxWidth: "20rem",
          }}
        >
          {!!errors.ident ? errors.ident.message : ""}
        </EnhancedText>
      </FormProvider>
    </Stack>
  );
}
