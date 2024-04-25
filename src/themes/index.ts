import { Theme } from "@mui/material";
import { ThemeColors } from "./lightSchema";
import lightTheme from "./lightSchema/light.theme";

export const LOCAL_STORE_THEME_KEY = "theme";

declare module "@mui/material/styles" {
  interface Theme {
    colors: ThemeColors;
  }

  interface ThemeOptions {
    colors: ThemeColors;
  }
}

const themes = {
  light: lightTheme,
  dark: lightTheme, // TODO: change
};
export type AppTheme = keyof typeof themes;

export function themeCreator(theme: keyof typeof themes): Theme {
  return themes[theme];
}
