import { logRoles, render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  test("renders nav and navigation links", () => {
    const { container } = render(<Sandbox />);
    logRoles(container);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  test("renders headings with correct hierarchy", () => {
    render(<Sandbox />);
    expect(
      screen.getByRole("heading", { name: "Main heading", level: 1 })
    ).toBeInTheDocument();
  });

  test("renders image with alternative text", () => {
    render(<Sandbox />);
    expect(screen.getByRole("img", { name: "example" })).toBeInTheDocument();
  });

  test("renders initial buttons", () => {
    render(<Sandbox />);
    expect(
      screen.getByRole("button", { name: /Click me/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /CAncel/i })).toBeInTheDocument();
  });

  test("error button is not initialy visible", () => {
    render(<Sandbox />);
    expect(
      screen.queryByRole("button", { name: "error" })
    ).not.toBeInTheDocument();
  });

  test("async button appears after delay", async () => {
    render(<Sandbox />);
    expect(
      screen.queryByRole("button", { name: /async button/i })
    ).not.toBeInTheDocument();
    const asyncButton = await screen.findByRole(
      "button",
      {
        name: /async button/i,
      },
      { timeout: 1500 }
    );
    expect(asyncButton).toBeInTheDocument();
  });
});
