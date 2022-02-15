import { fontFace } from "polished";

export const fonts = {
  ...fontFace({
    fontFamily: "Lora",
    fontFilePath: "/public/fonts/lora/Lora-Bold.ttf",
    fontWeight: "bold",
    fontDisplay: "fallback",
  }),
  ...fontFace({
    fontFamily: "Lora",
    fontFilePath: "/public/fonts/lora/Lora-Italic.ttf",
    fontWeight: "normal",
    fontStyle: "italic",
    fontDisplay: "fallback",
  }),
  ...fontFace({
    fontFamily: "Lora",
    fontFilePath: "/public/fonts/lora/Lora-Regular.ttf",
    fontWeight: "normal",
    fontDisplay: "fallback",
  }),
  ...fontFace({
    fontFamily: "Poppins",
    fontFilePath: "/public/fonts/poppins/Poppins-Bold.ttf",
    fontWeight: "bold",
    fontDisplay: "fallback",
  }),
  ...fontFace({
    fontFamily: "Poppins",
    fontFilePath: "/public/fonts/poppins/Poppins-Medium.ttf",
    fontWeight: "medium",
    fontDisplay: "fallback",
  }),
  ...fontFace({
    fontFamily: "Poppins",
    fontFilePath: "/public/fonts/poppins/Poppins-Regular.ttf",
    fontWeight: "normal",
    fontDisplay: "fallback",
  }),
  ...fontFace({
    fontFamily: "Poppins",
    fontFilePath: "/public/fonts/poppins/Poppins-SemiBold.ttf",
    fontWeight: "semibold",
    fontDisplay: "fallback",
  }),
};
