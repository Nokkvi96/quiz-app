import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";

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
  appearance: none;
  background-color: #fff;
  margin: 0;
  display: none;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: -9999px;
`;

const StyledCheckbox = styled(Box)<StyledCheckboxProps>`
  background: ${(props) =>
    props.checked ? colors.primary700 : colors.primary200};
  color: ${(props) => (props.checked ? colors.primary700 : colors.primary500)};
  width: 2rem;
  height: 2rem;
  border: 1px solid currentColor;
  border-radius: 20%;
  opacity: ${(props) => (props.disabled ? 0.33 : 1)};
  display: grid;
  place-content: center;
`;

const CheckboxWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items center;
  width: 100%;
  cursor: pointer;

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

  let svgColor = "transparent";
  svgColor = checked ? "primary200" : "transparent";

  return (
    <CheckboxWrapper my="auto" onClick={onChange}>
      <Label color={labelColor} fontSize={2}>
        {label}
      </Label>
      <StyledCheckbox checked={checked} disabled={disabled} {...props}>
        <EmptyCheckbox
          as="input"
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
        />
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
