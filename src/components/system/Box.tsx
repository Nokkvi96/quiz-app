import { HTMLAttributes } from "react";
import styled from "styled-components";
import {
  background,
  BackgroundProps,
  BorderProps,
  BorderColorProps,
  BorderRadiusProps,
  ButtonStyleProps,
  color,
  ColorProps,
  colorStyle,
  ColorStyleProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  ShadowProps,
  shadow,
  style,
  textStyle,
  TextStyleProps,
  typography,
  TypographyProps,
  variant,
  border,
  borderColor,
  borderRadius,
} from "styled-system";

type TextDecorationOption = "overline" | "line-through" | "underline";
type TextTransformOption = "uppercase" | "lowercase" | "capitalize";

export type BoxProps = BackgroundProps &
  BorderProps &
  BorderColorProps &
  BorderRadiusProps &
  ButtonStyleProps &
  ColorProps &
  ColorStyleProps &
  FlexboxProps &
  LayoutProps &
  OpacityProps &
  PositionProps &
  SpaceProps &
  ShadowProps &
  TextStyleProps &
  TypographyProps & {
    textDecoration?:
      | TextDecorationOption
      | (TextDecorationOption | null | string)[];
    textTransform?:
      | TextTransformOption
      | (TextTransformOption | null | string)[];
  } & HTMLAttributes<any>;

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration",
});

const textTransform = style({
  prop: "textTransform",
  cssProperty: "textTransform",
});

const boxStyles = compose(
  background,
  border,
  borderColor,
  borderRadius,
  color,
  colorStyle,
  flexbox,
  layout,
  opacity,
  position,
  space,
  textStyle,
  textDecoration,
  textTransform,
  typography,
  shadow,
  variant({
    prop: "variant",
    scale: "buttons",
    variants: {
      primary: {},
    },
  })
);

export const Box = styled.div<BoxProps>(
  {
    boxSizing: "border-box",
  },
  boxStyles
);
