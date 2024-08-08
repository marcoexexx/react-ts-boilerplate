import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function PasswordInputField(
  {
    fieldName,
    autoFocus = false,
  }: {
    fieldName: "password" | "passwordConfirm";
    autoFocus?: boolean;
  },
) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState: { errors } } = useFormContext();

  const handleToogleShowPassword = (
    _: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setShowPassword(prev => !prev);
  };

  const handleMouseDownPaswword = () => {};

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormControl
          {...field}
        >
          <InputLabel
            htmlFor={fieldName}
          >
            {fieldName}
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            error={!!errors[fieldName]}
            autoFocus={autoFocus}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToogleShowPassword}
                  onMouseDown={handleMouseDownPaswword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label={fieldName}
          />
          {!!errors[fieldName]
            ? (
              <FormHelperText sx={{ color: (theme) => theme.colors.error.main }}>
                {errors?.[fieldName]?.message as string || ""}
              </FormHelperText>
            )
            : null}
        </FormControl>
      )}
    />
  );
}
