import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "../Sandbox";
import { getFormElements } from "./Form.test";

describe("Reviews app", () => {
  test("renders Reviews App title", () => {
    render(<Sandbox />);
    expect(
      screen.getByRole("heading", { level: 1, name: /reviews app/i })
    ).toBeInTheDocument();
  });
  test("Adds a new review when the form is submitted with valid data", async () => {
    const user = userEvent.setup();
    render(<Sandbox />);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();
    // fill out the form
    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "4");
    await user.type(textArea, "This is a valid review text.");
    await user.click(submitButton);

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("⭐".repeat(Number("4")))).toBeInTheDocument();
    expect(
      screen.getByText("This is a valid review text.")
    ).toBeInTheDocument();
  });

  test("Alternative - adds a new review when the form is submitted with valid data", async () => {
    const user = userEvent.setup();
    render(<Sandbox />);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();
    const reviews = screen.queryAllByRole("article");
    expect(reviews).toHaveLength(0);
    // fill out the form
    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "4");
    await user.type(textArea, "This is a valid review text.");
    await user.click(submitButton);

    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
});
