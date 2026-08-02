import { render, screen } from "@testing-library/react";
import List from "../List";
import type { Review } from "../Sandbox";

const mockReviews: Review[] = [
  {
    email: "text@example.com",
    rating: "4",
    text: "This is a great product! I really enjoyed using it and would recommend it to others.",
  },
  {
    email: "user@example.com",
    rating: "5",
    text: "Excellent! Exceeded my expectations in every way. Will definitely buy again.",
  },
];

describe("List component", () => {
  test("renders heading", () => {
    render(<List reviews={[]} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });
  test("displays 'No reviews yet' when reviews array is empty", () => {
    render(<List reviews={[]} />);
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });
  test("renders reviews correctly when provided", () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
