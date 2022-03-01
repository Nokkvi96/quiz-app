import { ButtonHTMLAttributes, Component } from "react";
import styled from "styled-components";

import { Box, BoxProps } from "@components/system";

import { theme, buttons } from "src/theme";
const { colors, fontSizes, space } = theme;

type ButtonElements = "button" | "a";

interface ConditionalProps {
  as: ButtonElements;
  type?: "submit" | "button" | "reset";
}

export type ButtonProps = BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: ButtonElements;
    variant?: keyof typeof buttons;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    iconReverse?: boolean;
    block?: boolean;
    inline?: boolean;
    justify?: "center" | "space-between";
    loading?: boolean;
    selected?: boolean;
    ripple?: boolean;
    href?: string;
    target?: string;
  };

const ButtonBase = styled(Box)<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  align-items: center;
  box-shadow: ${theme.shadows.xs};

  transition-timing-function: ease-in-out;
  transition: border 0.3s, background-color 0.3s, box-shadow 0.3s,
    transform 0.3s;

  &:focus {
    border: none;
    outline: 4px solid ${colors.secondary200};
    background-color: ${colors.primary600};
    box-shadow: ${theme.shadows.m};
  }

  &:hover {
    background-color: ${colors.primary600};
    box-shadow: ${theme.shadows.m};
  }
  &:disabled {
    cursor: not-allowed;
  }
  opacity: ${(props) => (props.disabled ? 0.33 : 1)};
  ${(props) =>
    props.size === "small"
      ? `font-size: ${fontSizes[1]}; padding: ${space[2]} ${space[3]}`
      : props.size === "medium"
      ? `font-size: ${fontSizes[3]}; padding: ${space[3]} ${space[3]}`
      : `font-size: ${fontSizes[6]}; padding: ${space[4]} ${space[6]}`};

  ${(props) => (props.inline ? "display: inline-flex" : "")};
  ${(props) => (props.block ? "display: block; width: 100%;" : "")};
`;

const ButtonLabel = styled.span<ButtonProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => (props.iconReverse ? "row-reverse" : "row")};
`;

export class Button extends Component<ButtonProps> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const {
      as = "button",
      children,
      variant = "primary",
      justify = "center",
      size = "medium",
      type = "button",
      loading,
      disabled,
      ...props
    } = this.props;

    const conditionalProps: ConditionalProps = { as };

    if (as === "button") {
      conditionalProps.type = type;
    }

    return (
      <ButtonBase
        {...conditionalProps}
        variant={variant}
        disabled={disabled || loading}
        size={size}
        {...props}
      >
        {variant === "clear" ? (
          children
        ) : (
          <ButtonLabel size={size} justify={justify} {...props}>
            {children}
          </ButtonLabel>
        )}
      </ButtonBase>
    );
  }
}
