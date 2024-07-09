import { useStore } from "@/hooks";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeCreator } from ".";

export default function ThemeWrapper(
  { children }: { children: React.ReactNode },
) {
  const { state } = useStore();

  const theme = themeCreator(state.common.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
