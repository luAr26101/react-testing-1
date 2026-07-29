import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "./Sandbox";

describe("04-user-interactions", () => {
  test("screen debug", () => {
    const { container } = render(<Sandbox />);
    screen.debug();
    logRoles(container);
  });

  test("should increment and decrement count using fireEvent", () => {
    render(<Sandbox />);
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    fireEvent.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test("should increment and decrement count using userEvent", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    await user.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
  test("toggles between unliked and liked state when the like button is clicked", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();
    const unlikeButton = screen.getByRole("button", {
      name: /dislike button/i,
    });
    expect(unlikeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "like button" })
    ).not.toBeInTheDocument();
    await user.click(unlikeButton);
    const likeButton = screen.getByRole("button", { name: /^like button$/i });
    expect(likeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "dislike button" })
    ).not.toBeInTheDocument();
  });
});
