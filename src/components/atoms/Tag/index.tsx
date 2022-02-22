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
  position: relative;
  background-color: ${colors.primary};
  color: ${colors.primary50};
  border-radius: 0.2rem;
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
      <StyledTag py={[1, null, 2]} px={[2, null, 3]} fontSize={2}>
        {children}
      </StyledTag>
    </StyledTagWrapper>
  );
};

StyledTagWrapper.defaultProps = {
  singleLine: true,
  display: "block",
};
