/* eslint-disable import/no-duplicates */
import type { AppProps } from "next/app";
import { DefaultSeo } from "@utils/DefaultSeo";
import { BaseLayout } from "@components/templates/BaseLayout";

import { ThemeProvider } from "styled-components";
import { theme } from "@theme/theme";
import { GlobalStyle } from "@theme/GlobalStyle";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo />
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
