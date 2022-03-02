import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Contain } from "@components/system";
import { CheckboxGroup } from "./index";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Form/CheckboxGroup",
  component: CheckboxGroup,
} as ComponentMeta<typeof CheckboxGroup>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CheckboxGroup> = (args) => (
  <Contain fontSize={3} maxWidth="40ch">
    <CheckboxGroup {...args} gap={[2, 3, 4]} />
  </Contain>
);

export const Default = Template.bind({});

Default.args = {
  options: [
    { value: "True", label: "True" },
    { value: "False", label: "False" },
  ],
  value: [],
};
