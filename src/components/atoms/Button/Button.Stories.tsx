import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./index";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Default = Template.bind({});
export const Disabled = Template.bind({});
export const Active = Template.bind({});
export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Default.args = {
  children: "Default",
};

Disabled.args = {
  children: "Disabled",
  disabled: true,
};

Active.args = {
  children: "Active",
  selected: true,
};

Small.args = {
  children: "Small",
  size: "small",
};
Medium.args = {
  children: "Medium",
  size: "medium",
};
Large.args = {
  children: "Large",
  size: "large",
};
