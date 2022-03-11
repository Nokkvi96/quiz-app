import type { InputHTMLAttributes, HTMLAttributes } from "react";

import { BoxProps, FlexProps, Stack } from "@components/system";
import { Checkbox } from "@components/atoms";

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
    name: string;
  };

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  checked,
  disabled,
  subLabel,
  gap,
  value,
  name,
  onChange,
  ...props
}) => {
  return (
    <Stack as="ul" gap={gap}>
      {options.map((option: any, i) => (
        <li key={i}>
          <Checkbox
            value={option.value}
            checked={value.includes(option.value)}
            onChange={onChange}
            label={option.value}
            name={name}
            {...props}
          />
        </li>
      ))}
    </Stack>
  );
};
