import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import Sandbox from "./Sandbox";

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByRole("textbox", { name: /email/i }),
    passwordInputElement: screen.getByLabelText("Password"),
    confirmPasswordInputElement: screen.getByLabelText("Confirm password"),
    submitButtonElement: screen.getByRole("button", { name: /submit/i }),
  };
  return elements;
};

describe("05-form-testing", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  test("inputs should be initially empty", () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();
    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
  });

  test("should be able to type in the input", async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(emailInputElement, "test@test.com");
    expect(emailInputElement).toHaveValue("test@test.com");

    await user.type(passwordInputElement, "password");
    expect(passwordInputElement).toHaveValue("password");

    await user.type(confirmPasswordInputElement, "password");
    expect(confirmPasswordInputElement).toHaveValue("password");
  });

  test("should show email error if email is invalid", async () => {
    const { emailInputElement, submitButtonElement } = getFormElements();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    await user.type(emailInputElement, "invalid");
    await user.click(submitButtonElement);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  test("should show password error if password is less than 5 characters", async () => {
    const { emailInputElement, passwordInputElement, submitButtonElement } =
      getFormElements();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "abcd");
    await user.click(submitButtonElement);
    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  test("should show password error passwords don't match", async () => {
    const {
      emailInputElement,
      passwordInputElement,
      submitButtonElement,
      confirmPasswordInputElement,
    } = getFormElements();
    const errorMsg = /passwords do not match/i;
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "notsecret");
    await user.click(submitButtonElement);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  test("valid inputs show no error and clear fields", async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      submitButtonElement,
    } = getFormElements();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "secret");
    await user.type(confirmPasswordInputElement, "secret");
    await user.click(submitButtonElement);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
  });
});
