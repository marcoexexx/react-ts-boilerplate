import { LocaleOptions, localization, TxPath } from "@/locale";
import { styled, Typography, TypographyProps } from "@mui/material";
import { forwardRef } from "react";

const TypographyWrapper = styled(Typography)(({}) => ({}));

interface EnhancedTextProps extends TypographyProps {
  tx?: TxPath;
  txOption?: LocaleOptions;
  text?: string;
}

export const EnhancedText = forwardRef<
  HTMLDivElement,
  EnhancedTextProps
>(
  (props, ref) => {
    const { children, tx, txOption, text, ...reset } = props;
    const content = tx ? localization.t(tx, txOption) : text;

    return (
      <TypographyWrapper {...reset} ref={ref}>
        {children || content}
      </TypographyWrapper>
    );
  },
);
