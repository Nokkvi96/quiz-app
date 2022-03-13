import { Checkbox } from "./Checkbox";
import { render } from "@testing-library/react";

test("should render", () => {
  render(<Checkbox label="Checkbox" name="group" />);
});
