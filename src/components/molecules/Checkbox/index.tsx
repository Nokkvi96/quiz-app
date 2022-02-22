import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";

import { Box, BoxProps } from "@components/system";
import { Label } from "@components/atoms";

import { theme } from "@theme/theme";

export type StyledCheckboxProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any> & { name: string };

export type CheckboxProps = StyledCheckboxProps & {
  label: string;
  checked: boolean;
  disabled?: boolean;
  subLabel?: string;
};

const { colors } = theme;

export const StyledCheckbox = styled(Box)<StyledCheckboxProps>`
  appearance: none;
  background-color: #fff;
  margin: 0;

  background: ${(props) =>
    props.checked ? colors.primary700 : colors.primary200};
  color: ${(props) => (props.checked ? colors.primary700 : colors.primary500)};
  width: 2rem;
  height: 2rem;
  border: 0.15em solid currentColor;
  border-radius: 20%;
  opacity: ${(props) => (props.disabled ? 0.33 : 1)};
  display: grid;
  place-content: center;
`;

export const CheckboxWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-content center;
  width: 100%;
  cursor: pointer;

  border: 1px solid ${colors.grey300};
  border-radius: 8px;
  * {
    cursor: inherit
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  color,
  name,
  label,
  disabled,
  subLabel,
  checked,
  onChange,
  ...props
}) => {
  const labelColor = disabled ? "grey" : "black";

  return (
    <CheckboxWrapper my="auto" onClick={onChange}>
      <Label color={labelColor} fontSize={2}>
        {label}
      </Label>
      <StyledCheckbox
        as="input"
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        {...props}
      />
    </CheckboxWrapper>
  );
};

StyledCheckbox.defaultProps = {
  color: "primary",
};
