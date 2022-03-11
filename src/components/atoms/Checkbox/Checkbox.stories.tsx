import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Checkbox } from "./index";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Atoms/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox checked={false} {...args} />
);

export const Default = Template.bind({});
export const Disabled = Template.bind({});
export const Active = Template.bind({});

Default.args = {
  label: "Checkbox",
  name: "CheckboxGroup",
  disabled: false,
  checked: false,
};

Disabled.args = {
  label: "Checkbox",
  name: "CheckboxGroup",
  disabled: true,
  checked: false,
};

Active.args = {
  label: "Checkbox",
  name: "CheckboxGroup",
  disabled: false,
  checked: true,
};
