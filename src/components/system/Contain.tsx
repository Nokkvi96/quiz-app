import styled from "styled-components";
import { DisplayProps, HeightProps, LayoutProps } from "styled-system";
import { Box } from "./Box";
import { theme } from "src/theme";

type ContainProps = DisplayProps & HeightProps & LayoutProps;

export const Contain = styled(Box)<ContainProps>``;

Contain.defaultProps = {
  mx: "auto",
  px: theme?.grid?.container?.padding,
  maxWidth: theme?.grid?.container?.maxWidth,
};
