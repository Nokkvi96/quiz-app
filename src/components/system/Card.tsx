import styled from "styled-components";
import { border, BorderProps, compose } from "styled-system";

import { Box, BoxProps } from "./Box";

export type CardProps = BoxProps & BorderProps;

export const Card = styled(Box)<CardProps>(compose(border));
