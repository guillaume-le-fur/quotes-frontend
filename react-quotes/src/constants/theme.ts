// import {createTheme} from "@mui/material/styles";


import {createTheme, Palette, PaletteOptions} from "@mui/material";
import {Typography, TypographyOptions} from "@mui/material/styles/createTypography";
import {
    DARK_BLUE1, ERROR_RED,
    GOLD1, GOLD1_05,
    INFO_BLUE,
    LIGHT_BLUE_GREY,
    SUCCESS_GREEN,
    WARM_GREY_1C,
    WARM_GREY_7C,
    WARN_ORANGE
} from "./styleConstants";

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette;
    typography: Typography;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: PaletteOptions;
    typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  }
}

const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: DARK_BLUE1,
            contrastText: GOLD1,
        },
        secondary: {
            main: WARM_GREY_7C,
        },
        background: {
            default: WARM_GREY_1C,
            paper: LIGHT_BLUE_GREY,
        },
        text: {
            primary: DARK_BLUE1,
            secondary: GOLD1,
        },
        warning: {
            main: WARN_ORANGE,
        },
        error: {
            main: ERROR_RED,
        },
        info: {
            main: INFO_BLUE,
        },
        success: {
            main: SUCCESS_GREEN,
        },
        divider: GOLD1_05,
    },
    typography: {
        fontFamily: 'Muli',
    },
}

export const appTheme = createTheme(themeOptions);