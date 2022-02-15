import styled from "styled-components";
import { compose, grid, GridProps } from "styled-system";

import { Box, BoxProps } from "./Box";

export type CustomGridProps = BoxProps & GridProps;

export const Grid = styled(Box)<GridProps>(compose(grid));

Grid.defaultProps = {
  display: "grid",
};
