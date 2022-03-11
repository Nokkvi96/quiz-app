import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Label } from "./index";

export default {
  title: "Atoms/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Label> = (args) => (
  <Label {...args}>{args.children}</Label>
);

export const Default = Template.bind({});

Default.args = {
  children: "Default",
};

Default.storyName = "Label";
