import styled, { css } from "styled-components";
import { TypographyProps } from "styled-system";
import { theme } from "src/theme";

import { Box, BoxProps } from "@components/system";

export type TagProps = BoxProps &
  TypographyProps & {
    singleLine: boolean;
  };

const { colors } = theme;

const StyledTagWrapper = styled(Box)<TagProps>`
  background-color: ${colors.primary100};
  color: ${colors.primary700};
  border: 1px solid ${colors.primary200};
  border-radius: 0.2rem;

  align-self: flex-start;
  ${(props) =>
    props.singleLine &&
    css`
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
      text-overflow: ellipsis;
    `};
`;

const StyledTag = styled(Box)<BoxProps>`
  justify-content: center;
  position: relative;
`;

export const Tag: React.FC<TagProps> = ({ children, ...props }) => {
  return (
    <StyledTagWrapper {...props}>
      <StyledTag py={1} px={[2, null, 3]} fontSize={2}>
        {children}
      </StyledTag>
    </StyledTagWrapper>
  );
};

StyledTagWrapper.defaultProps = {
  display: "flex",
};
