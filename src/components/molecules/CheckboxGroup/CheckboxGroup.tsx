import type { InputHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";
import { BoxProps, FlexProps, Box, Stack } from "@components/system";
import { Label, Checkbox } from "@components/atoms";

interface Option {
  value: string;
  label: string;
}

export type CheckboxGroupProps = BoxProps &
  FlexProps &
  InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<any> & {
    options: Option[];
    value: string[];
    checked?: boolean;
    disabled?: boolean;
    subLabel?: string;
  };

const CheckboxWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items center;
  width: 100%;
`;

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  checked,
  disabled,
  subLabel,
  gap,
  value,
  onChange,
  ...props
}) => {
  const labelColor = disabled ? "grey" : "black";

  return (
    <Stack gap={gap}>
      {options.map((option: any, i) => (
        <CheckboxWrapper my="auto" key={i}>
          <Label color={labelColor} mr={2} fontSize={2}>
            {option.value}
          </Label>
          <Checkbox
            value={option.value}
            name="test"
            checked={value.includes(option.value)}
            onChange={onChange}
            {...props}
          />
        </CheckboxWrapper>
      ))}
    </Stack>
  );
};
