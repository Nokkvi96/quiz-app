import type { Omit } from "src/types";
import React, { FC } from "react";
import styled from "styled-components";
import {
  system,
  ResponsiveValue,
  TLengthStyledSystem,
  Theme,
} from "styled-system";
import css from "@styled-system/css";

import { theme, IconOption, icons } from "src/theme";
import { Box, BoxProps } from "@components/system";

type IconProps = Omit<BoxProps, "width" | "height"> & {
  icon: IconOption;
  rotate?: number;
  color?: string;
  size?: ResponsiveValue<
    string | number | symbol,
    Required<Theme<TLengthStyledSystem>>
  >;
};

const StyledIconWrapper = styled(Box)<
  BoxProps & {
    rotate?: number;
    size?: ResponsiveValue<
      string | number | symbol,
      Required<Theme<TLengthStyledSystem>>
    >;
  }
>(
  system({
    size: {
      // @ts-ignore
      properties: ["width", "height"],
      scale: "space",
      transform: (value, scale) => (scale as TLengthStyledSystem[])[value],
    },
  }),
  css({
    // @ts-ignore
    transition: "transform 0.2s ease-in-out", // @ts-ignore
    display: "flex", // @ts-ignore
    flexShrink: "0", // @ts-ignore
    justifyContent: "center", // @ts-ignore
    alignItems: "center", // @ts-ignore
  })
);

export const Icon: FC<IconProps> = ({ size, icon, fontSize, ...props }) => {
  const IconComponent = icons[icon];

  // fontSizes array
  const { fontSizes } = theme;

  /**
   * fontSize is present we use fontSize else we use size
   * if fontSize is number we use fontSize array else we use
   * fontSize value
   */
  let iconSize = size;
  !fontSize
    ? (iconSize = size)
    : // If fontSize is present
    typeof fontSize === "number"
    ? (iconSize = fontSizes[fontSize]) // @ts-ignore
    : (iconSize = fontSize);

  return (
    <StyledIconWrapper {...props} size={iconSize} color={props.color}>
      <IconComponent
        role="presentation"
        aria-hidden="true"
        focusable="false"
        style={{
          fill: "currentColor",
        }}
        width="100%"
        height="100%"
      />
    </StyledIconWrapper>
  );
};

Icon.defaultProps = {
  size: "1em",
};
