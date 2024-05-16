import { render, screen } from "../../../App";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "../../../pages/auth/signin";

test("Sign In should be rendered", async () => {
  // ARRANGE
  render(<Signin />);

  // ACT
  //   await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("Sign In");
  //   expect(screen.getByRole('button')).toBeDisabled()
});
