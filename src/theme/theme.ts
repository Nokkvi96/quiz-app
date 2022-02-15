import { modularScale } from "polished";

import { DefaultTheme } from "styled-components";

import { colors } from "./colors";
import { grid, ThemeGrid } from "./grid";

const fontSizes = [];
for (let i = 0; i < 15; i++) {
  fontSizes[i] = modularScale(i - 2, "1rem", "majorThird");
}

const space = [
  "0rem", // 0
  "0.2rem", // 1
  "0.4rem", // 2
  "0.8rem", // 3
  "1rem", // 4
  "1.2rem", // 5
  "1.6rem", // 6
  "1.4rem", // 7
  "1.8rem", // 8
  "2rem", // 9
  "2.4rem", // 10
  "2.8rem", // 11
  "3.2rem", // 12
  "3.6rem", // 13
  "4rem", // 14
  "4.5rem", // 15
  "5rem", // 16
  "5.5rem", // 17
  "6rem", // 18
  "7rem", // 19
];

const buttonBase = {
  fontWeight: "bold",
  border: "1px solid",
  borderColor: "primary",
  padding: "0 20px",
  height: 50,
  borderRadius: 10,
};

export const buttons = {
  primary: {
    ...buttonBase,
    bg: "primary",
    color: "white",
    ["&:hover, &:focus"]: {
      backgroundColor: "colors.primary.600",
    },
  },
  secondary: {
    ...buttonBase,
    color: "black",
  },
  clear: {
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    height: "auto",
  },
};

const fonts = {
  body: "Poppins, sans-serif",
  heading: "Lora, serif",
};

const shadows = {
  xs: "1px 3px 8px rgba(28, 28, 32, 0.1), 0px 1px 4px rgba(28, 28, 32, 0.25)",
  s: "2px 4px 15px rgba(28, 28, 32, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25)",
  m: "2px 6px 20px rgba(28, 28, 32, 0.1), 1px 3px 4px rgba(28, 28, 32, 0.23)",
  l: "3px 7px 25px rgba(28, 28, 32, 0.08), 2px 4px 6px rgba(28, 28, 32, 0.21)",
  xl: "4px 8px 29px rgba(28, 28, 32, 0.08), 3px 6px 8px rgba(28, 28, 32, 0.18)",
  outline: "0px 0px 0px 4px rgba(0, 0, 0, 0.1);",
};

export interface CustomTheme {
  breakpoints: string[];
  fontSizes: typeof fontSizes;
  colors: typeof colors;
  space: typeof space;
  fonts: typeof fonts;
  shadows: typeof shadows;
  buttons: typeof buttons;
  outline?: string;
  grid: ThemeGrid;
}

export const theme: DefaultTheme = {
  breakpoints: ["40rem", "52rem", "64rem"],
  fontSizes,
  space,
  fonts,
  shadows,
  outline: `5px auto #5E9ED6`,
  colors,
  buttons,
  grid,
};
