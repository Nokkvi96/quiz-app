import styled from "styled-components";
import { system, ResponsiveValue } from "styled-system";
import { Flex } from "./Flex";
import { BoxProps } from "./Box";

type Direction = "column" | "row";

type Props = BoxProps & {
  /** Spacing between items */
  direction?: ResponsiveValue<Direction>;
};

export const Stack = styled(Flex)<Props>(
  system({
    direction: {
      // @ts-ignore
      property: "&&",
      transform: (value) => ({
        flexDirection: value,
      }),
    },
  })
);

Stack.defaultProps = {
  direction: "column",
};
