/* eslint-disable import/no-duplicates */
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

import { DefaultSeo } from "@utils/DefaultSeo";
import { BaseLayout } from "@components/templates/BaseLayout";
import { theme } from "@theme/theme";
import { GlobalStyle } from "@theme/GlobalStyle";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <DefaultSeo />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <RecoilRoot>
            <>
              <GlobalStyle />
              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>
            </>
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
