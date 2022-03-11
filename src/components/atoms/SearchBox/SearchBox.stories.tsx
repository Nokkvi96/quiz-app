import { ComponentMeta, Story } from "@storybook/react";

import { SearchBox as SearchBoxComponent } from "./index";

export default {
  title: "Atoms/SearchBox",
  component: SearchBoxComponent,
} as ComponentMeta<typeof SearchBoxComponent>;

export const SearchBox: Story<typeof SearchBoxComponent> = (args) => (
  <SearchBoxComponent value="value" label="label" {...args} />
);

SearchBox.storyName = "SearchBox";
