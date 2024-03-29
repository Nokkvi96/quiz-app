import React, { InputHTMLAttributes, useState } from "react";
import styled, { css } from "styled-components";

import { theme } from "@theme/theme";
import { Box } from "@components/system";
import { Label } from "@components/atoms";

import { SearchIcon } from "./SearchIcon";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  //   color?: "small" | "large";
  label?: string;
}

const { colors, fontSizes } = theme;

const StyledInput = styled.input<InputProps>`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background-color: transparent;
  border: none;
  overflow: hidden;
  margin: 0;
  font-size: ${fontSizes[3]};
  margin-right: 0.2em;

  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${colors.grey400};
  }
`;

type InputWrapperProps = InputProps & { hasFocus: boolean };

const InputWrapper = styled.div<InputWrapperProps>`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-content center;
  background-color: ${colors.primary100};
  width: 100%;

  color: ${(props) => props.color || colors.black}};
  border: 1px solid ${colors.primary400};
  border-radius: 8px;
  padding: 0.4em 0.5em;


  &:hover {
    border-color: ${colors.primary600};
  }

  ${(props) =>
    props.hasFocus &&
    css`
      border: 1px solid ${colors.primary600};
      outline: 1px solid ${colors.primary600};
    `};
`;

export const SearchBox: React.FC<InputProps> = ({ label, size, ...props }) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <>
      {label && (
        <Label color={colors.primary800} fontWeight="bold" pb={[2, null, 4]}>
          {label}
        </Label>
      )}
      <InputWrapper hasFocus={hasFocus}>
        <StyledInput
          aria-label="searchbox"
          {...props}
          onBlur={(e) => {
            setHasFocus(false);
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
          onFocus={(e) => {
            setHasFocus(true);
            if (props.onFocus) {
              props.onFocus(e);
            }
          }}
        />
        <Box my="auto" maxHeight="100%">
          <SearchIcon fill={colors.primary300} width="1.25em" height="1.25em" />
        </Box>
      </InputWrapper>
    </>
  );
};
