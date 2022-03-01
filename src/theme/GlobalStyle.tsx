import { normalize } from "polished";
import { createGlobalStyle } from "styled-components";

import { fonts } from "./fonts";
import { theme } from "./theme";

const { colors } = theme;
export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${fonts}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
    color: ${theme.colors.black};
  }

  * {
    &:focus {
      outline: 3px solid ${theme.colors.secondary300};
    }
  }

  h1,
  h2,
  h3,
  h4,
  p,
  li,
  figcaption {
    max-width: 60ch;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.bg};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.2;
    min-width: 320px;
    text-rendering: optimizeSpeed;
  }
  
  h1,h1,h3,h4,h5,h6 {
    font-family: ${theme.fonts.heading};
  }

  h1 {
    font-size: ${theme.fontSizes[10]};
  }
  h2 {
    font-size: ${theme.fontSizes[9]};
  }
  h3 {
    font-size: ${theme.fontSizes[7]};
  }
  h4 { 
    font-size: ${theme.fontSizes[5]};
  }
  h5 {
    font-size: ${theme.fontSizes[4]};
  }
  h6 {
    font-size: ${theme.fontSizes[3]};
  }

  a {
    color: inherit;
    text-decoration: none;
  }


  --toastify-color-light: ${colors.white};
  --toastify-color-dark: ${colors.black};
  --toastify-color-info: ${colors.primary500};
  --toastify-color-success: ${colors.green500};
  --toastify-color-warning: ${colors.red500};
  --toastify-color-error: ${colors.red500};
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-toast-width: 320px;
  --toastify-toast-background: #fff;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;

  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  //Used only for colored theme
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;

  // Used when no type is provided
  // toast("**hello**")
  --toastify-color-progress-light: linear-gradient(
    to right,
    #4cd964,
    #5ac8fa,
    #007aff,
    #34aadc,
    #5856d6,
    #ff2d55
  );
  // Used when no type is provided
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
`;
