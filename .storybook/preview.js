import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import { theme } from "../src/theme";
import { GlobalStyle } from "../src/theme/GlobalStyle";
import { Box } from "../src/components/system";

export const parameters = {
  options: {
    storySort: {
      order: ["Atoms", "Form"],
      method: "alphabetical",
    },
  },
};

addDecorator((story) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Box p={20}>{story()}</Box>
    </ThemeProvider>
  </>
));
