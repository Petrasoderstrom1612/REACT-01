import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoCounter from "../TodoCounter";

describe("Todo Counter", () => {
	it("Shows the correct count with no todos", () => {
		// Render/arrange
		render(<TodoCounter completed={0} total={0} />);

		// Find/act
		const textElement = screen.getByText(/0 todos/i);

		// Assert
		// expect(textElement).toBeInTheDocument();  // only checks if it exists in DOM, **NOT** if it's actually visibile
		expect(textElement).toBeVisible();
	});

	it("Shows the correct count with one todo", () => {
		// Render/arrange
		render(<TodoCounter completed={0} total={1} />);

		// Find/act
		const paragraphElement = screen.getByRole("paragraph");

		// Assert
		expect(paragraphElement).toHaveTextContent(/1 todo /i);
	});
});
