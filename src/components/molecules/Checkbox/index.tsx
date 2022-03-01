import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";
import { hideVisually } from "polished";

import { Box, BoxProps } from "@components/system";
import { Label, Icon } from "@components/atoms";

import { theme } from "@theme/theme";

export type StyledCheckboxProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any>;

export type CheckboxProps = StyledCheckboxProps & {
  label: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  subLabel?: string;
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

const CheckboxWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items center;
  width: 100%;
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  color,
  name,
  label,
  disabled,
  subLabel,
  checked,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const labelColor = disabled ? "grey" : "black";

  let svgColor = "transparent";
  svgColor = checked ? "primary200" : "transparent";

  return (
    <CheckboxWrapper my="auto">
      <Label color={labelColor} mr={2} fontSize={2}>
        {label}
      </Label>
      <EmptyCheckbox
        as="input"
        type="checkbox"
        onFocus={onFocus}
        onBlur={onBlur}
        checked={checked}
        onChange={onChange}
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
    </CheckboxWrapper>
  );
};

StyledCheckbox.defaultProps = {
  color: "primary",
};
