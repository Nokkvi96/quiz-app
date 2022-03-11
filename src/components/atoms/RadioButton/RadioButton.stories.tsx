import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RadioButton } from "./index";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Atoms/RadioButton",
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RadioButton> = (args) => (
  <RadioButton checked={false} {...args} />
);

export const Default = Template.bind({});
export const Disabled = Template.bind({});
export const Active = Template.bind({});

Default.args = {
  label: "RadioButton",
  name: "RadioButtonGroup",
  disabled: false,
  checked: false,
};

Disabled.args = {
  label: "RadioButton",
  name: "RadioButtonGroup",
  disabled: true,
  checked: false,
};

Active.args = {
  label: "RadioButton",
  name: "RadioButtonGroup",
  disabled: false,
  checked: true,
};
