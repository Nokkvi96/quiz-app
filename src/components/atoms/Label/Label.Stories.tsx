import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Label } from "./index";

export default {
  title: "Label",
  component: Label,
} as ComponentMeta<typeof Label>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Label> = (args) => (
  <Label {...args}>{args.children}</Label>
);

export const Default = Template.bind({});
export const Disabled = Template.bind({});
export const Active = Template.bind({});

Default.args = {
  children: "Default",
};

Disabled.args = {
  children: "Disabled",
};

Active.args = {
  children: "Active",
};
