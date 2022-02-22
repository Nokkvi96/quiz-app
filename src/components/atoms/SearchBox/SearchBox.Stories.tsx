import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SearchBox } from "./index";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "SearchBox",
  component: SearchBox,
} as ComponentMeta<typeof SearchBox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SearchBox> = (args) => (
  <SearchBox {...args} />
);

export const Default = Template.bind({});
export const Disabled = Template.bind({});

Default.args = {
  label: "Default",
  value: "Test",
};

Disabled.args = {
  label: "Disabled",
  disabled: true,
};
