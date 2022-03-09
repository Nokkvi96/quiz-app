import type { InputHTMLAttributes, HTMLAttributes } from "react";
import { BoxProps, FlexProps, Stack } from "@components/system";
import { RadioButton } from "@components/atoms";

interface Option {
  value: string;
  label: string;
}

export type RadioButtonGroupProps = BoxProps &
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

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  checked,
  disabled,
  subLabel,
  gap,
  value,
  onChange,
  ...props
}) => {
  return (
    <ul>
      <Stack gap={gap}>
        {options.map((option: any, i: number) => (
          <li key={i}>
            <RadioButton
              value={option.value}
              checked={value.includes(option.value)}
              onChange={onChange}
              label={option.value}
              {...props}
            />
          </li>
        ))}
      </Stack>
    </ul>
  );
};
