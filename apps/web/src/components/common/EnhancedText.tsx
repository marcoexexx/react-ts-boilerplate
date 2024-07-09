import { styled, Typography, TypographyProps } from "@mui/material";
import { LocaleOptions, translate, TxPath } from "locale";
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
    const content = tx ? translate(tx, txOption) : text;

    return (
      <TypographyWrapper {...reset} ref={ref}>
        {children || content}
      </TypographyWrapper>
    );
  },
);
