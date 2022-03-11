import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";
import { hideVisually } from "polished";

import { Box, BoxProps, Text, Flex } from "@components/system";
import { Label, LabelProps } from "@components/atoms";

import { theme } from "@theme/theme";

export type StyledRadioButtonProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any>;

export type RadioButtonProps = StyledRadioButtonProps & {
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

const EmptyRadioButton = styled.input<StyledRadioButtonProps>`
  ${hideVisually()};
`;

const StyledRadioButton = styled(Box)<StyledRadioButtonProps>`
  flex-shrink: 0;
  background-color: ${colors.primary200};
  color: ${colors.primary500};
  width: 2rem;
  height: 2rem;
  border: 1px solid currentColor;
  border-radius: 99999px;
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

export const RadioButton: React.FC<RadioButtonProps> = ({
  color,
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
        <EmptyRadioButton
          as="input"
          type="radio"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          {...props}
        />
        <StyledRadioButton disabled={disabled} mr={[3, null, 4]}>
          <Box
            border={checked ? `3px solid ${colors.primary200}` : "none"}
            borderRadius="9999px"
            height="1.4rem"
            width="1.4rem"
          />
        </StyledRadioButton>
        <Text fontSize={2}>{label}</Text>
      </Flex>
    </StyledLabel>
  );
};
