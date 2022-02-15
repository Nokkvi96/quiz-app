import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { TypographyProps } from "styled-system";

import { Box, BoxProps } from "@components/system";

export type LabelProps = BoxProps &
  TypographyProps &
  HTMLAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLLabelElement> & {
    target?: string;
    singleLine?: boolean;
  };

export const StyledLabel = styled(Box)<LabelProps>`
  ${(props) =>
    props.singleLine &&
    css`
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
      text-overflow: ellipsis;
    `}
`;
export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <StyledLabel aria-label="label" as="label" {...props}>
      {children}
    </StyledLabel>
  );
};
