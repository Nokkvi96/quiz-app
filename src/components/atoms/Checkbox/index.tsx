import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";
import { hideVisually } from "polished";

import { Box, BoxProps } from "@components/system";
import { Icon } from "@components/atoms";

import { theme } from "@theme/theme";

export type StyledCheckboxProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any>;

export type CheckboxProps = StyledCheckboxProps & {
  name: string;
  checked?: boolean;
  disabled?: boolean;
};

const { colors } = theme;

const EmptyCheckbox = styled(Box)<StyledCheckboxProps>`
  ${hideVisually()}
`;

const StyledCheckbox = styled(Box)<StyledCheckboxProps>`
  background-color: ${colors.primary200};
  color: ${colors.primary500};
  width: 2rem;
  height: 2rem;
  border: 1px solid currentColor;
  border-radius: 20%;
  opacity: ${(props) => (props.disabled ? 0.33 : 1)};
  display: grid;
  place-content: center;
  cursor: pointer;

  transition-timing-function: ease-in-out;
  transition: border 0.2s, background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: ${colors.primary300};
    color: ${colors.primary300};
    transform: scale(1.1);
  }

  input:checked + & {
    background-color: ${colors.primary700};
    color: ${colors.primary700};
    &:hover {
      background-color: ${colors.primary600};
    }
  }

  input:focus + & {
    outline: 2px solid ${colors.secondary300};
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  color,
  name,
  disabled,
  checked,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  let svgColor = "transparent";
  svgColor = checked ? "primary200" : "transparent";
  return (
    <Box>
      <EmptyCheckbox
        as="input"
        type="checkbox"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        checked={checked}
        {...props}
      />
      <StyledCheckbox disabled={disabled} onClick={onChange}>
        <Icon
          icon="Checkmark"
          fontSize="1.8rem"
          color={svgColor}
          border={`1px solid ${colors.primary200}`}
          borderRadius="20%"
        />
      </StyledCheckbox>
    </Box>
  );
};

StyledCheckbox.defaultProps = {
  color: "primary",
};
