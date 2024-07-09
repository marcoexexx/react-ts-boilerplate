import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";
import { LocaleOptions, localization, TxPath } from "locale";
import { forwardRef } from "react";

const MuiButtonWrapper = styled(LoadingButton)(() => ({}));

interface EnhancedButtonProps extends LoadingButtonProps {
  tx?: TxPath;
  txOption?: LocaleOptions;
  text?: string;
}

export const EnhancedButton = forwardRef<
  HTMLButtonElement,
  EnhancedButtonProps
>(
  (props, ref) => {
    const { children, tx, txOption, text, ...reset } = props;
    const content = tx ? localization.t(tx, txOption) : text;

    return (
      <MuiButtonWrapper {...reset} ref={ref}>
        {children || content}
      </MuiButtonWrapper>
    );
  },
);
