import { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";

import { Box, BoxProps } from "@components/system";

export type RadioButtonProps = BoxProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any> & { name: string };

export const StyledRadioButton = styled(Box)<RadioButtonProps>`
  cursor: pointer;
  opacity: 1;
  z-index: 1;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin-right: 10px;
`;

export const RadioButton: React.FC<RadioButtonProps> = ({
  color,
  name,
  ...props
}) => {
  return (
    <StyledRadioButton
      as="input"
      type="radio"
      name={name}
      borderColor={color}
      bg={color}
      {...props}
    />
  );
};

RadioButton.defaultProps = {
  color: "bg",
};
