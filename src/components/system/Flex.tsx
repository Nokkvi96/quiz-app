import styled from "styled-components";
import { system, ResponsiveValue, TLengthStyledSystem } from "styled-system";
import { Box, BoxProps } from "./Box";

export type FlexProps = BoxProps & {
  gap?: ResponsiveValue<TLengthStyledSystem>;
};

export const Flex = styled(Box)<FlexProps>(
  system({
    gap: {
      // @ts-ignore
      property: "gap",
      scale: "space",
      transform: (value, scale) => (scale as TLengthStyledSystem[])[value],
    },
  })
);

Flex.defaultProps = {
  display: "flex",
};
