import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Form";

export const getFormElements = () => {
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  }) as HTMLInputElement;
  const ratingSelect = screen.getByRole("combobox", {
    name: /rating/i,
  }) as HTMLSelectElement;
  const textArea = screen.getByRole("textbox", {
    name: /your review/i,
  }) as HTMLTextAreaElement;
  const submitButton = screen.getByRole("button", {
    name: /submit review/i,
  }) as HTMLButtonElement;

  return { emailInput, ratingSelect, textArea, submitButton };
};

describe("Form component", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });
  test("renders form elements correctly", () => {
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();
    expect(emailInput).toHaveValue("");
    expect(ratingSelect).toHaveValue("");
    expect(textArea).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  test("shows error message when review text is too short", async () => {
    const user = userEvent.setup();
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Too short");
    await user.click(submitButton);
    expect(
      screen.getByText(/review must be at least 10 characters long/i)
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("submits form with valid data", async () => {
    const user = userEvent.setup();
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, "test@example.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Great product! I really enjoyed using it.");
    await user.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      rating: "5",
      text: "Great product! I really enjoyed using it.",
    });
  });
});
