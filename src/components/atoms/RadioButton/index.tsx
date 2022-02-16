import { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";

import { Box, BoxProps } from "@components/system";

export type RadioButtonProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any>;

export const StyledRadioButton = styled(Box)<RadioButtonProps>`
  cursor: pointer;
  opacity: 1;
  z-index: 1;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin-right: 10px;
`;

export const RadioButton: React.FC<RadioButtonProps> = ({ ...props }) => {
  return <StyledRadioButton as="input" type="radio" name="radio" {...props} />;
};
