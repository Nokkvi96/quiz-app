import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";
import { hideVisually } from "polished";

import { Box, BoxProps, Text, Flex } from "@components/system";
import { Icon, Label, LabelProps } from "@components/atoms";

import { theme } from "@theme/theme";

export type StyledCheckboxProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any>;

export type CheckboxProps = StyledCheckboxProps & {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  label: string;
};

const { colors } = theme;

const StyledLabel = styled(Label)<LabelProps & { disabled?: boolean }>`
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    `
  cursor: default;
  opacity: 0.63;
  `}

  input:disabled + & {
    cursor: deafult;
    &:hover {
      background-color: ${colors.primary600};
    }
  }
`;

const EmptyCheckbox = styled.input<StyledCheckboxProps>`
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

  transition-timing-function: ease-in-out;
  transition: border 0.2s, background-color 0.2s, transform 0.2s;

  ${(props) =>
    !props.disabled &&
    `&:hover {
    background-color: ${colors.primary300};
    color: ${colors.primary300};
    transform: scale(1.1);
  }`}

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
  name,
  disabled,
  checked,
  label,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  return (
    <StyledLabel disabled={disabled}>
      <Flex alignItems="center">
        <EmptyCheckbox
          as="input"
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          {...props}
        />
        <StyledCheckbox disabled={disabled} mr={[3, null, 4]}>
          <Icon
            icon="Checkmark"
            fontSize="1.8rem"
            color={checked ? "primary200" : "transparent"}
            border={`1px solid ${colors.primary200}`}
            borderRadius="20%"
          />
        </StyledCheckbox>
        <Text fontSize={2}>{label}</Text>
      </Flex>
    </StyledLabel>
  );
};
