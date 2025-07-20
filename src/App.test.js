import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders display with initial 0", () => {
  render(<App />);
  // Use test ID for the display element
  expect(screen.getByTestId("display")).toHaveTextContent("0");
});

test("buttons are rendered and clickable", async () => {
  render(<App />);
  const user = userEvent.setup();

  // Verify buttons exist
  expect(screen.getByRole("button", { name: "AC" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "DEL" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "=" })).toBeInTheDocument();

  // Perform calculation
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  // Verify result in display
  expect(screen.getByTestId("display")).toHaveTextContent("2");
});

test("AC clears the input", async () => {
  render(<App />);
  const user = userEvent.setup();

  await user.click(screen.getByRole("button", { name: "1" }));
  expect(screen.getByTestId("display")).toHaveTextContent("1");

  await user.click(screen.getByRole("button", { name: "AC" }));
  expect(screen.getByTestId("display")).toHaveTextContent("0");
});

test("DEL deletes last character", async () => {
  render(<App />);
  const user = userEvent.setup();

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  expect(screen.getByTestId("display")).toHaveTextContent("12");

  await user.click(screen.getByRole("button", { name: "DEL" }));
  expect(screen.getByTestId("display")).toHaveTextContent("1");
});