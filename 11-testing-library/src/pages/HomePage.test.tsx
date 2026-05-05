import { screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { renderWithRouter } from "../tests/render-utils";
import HomePage from "./HomePage";

it("Welcomes the user on the home page", () => {
	// Render/Arrange (with MemoryRouter as the Link-component on HomePage needs a route context)
	renderWithRouter(<HomePage />);

	// Find/act
	const headingElement = screen.getByRole("heading");
    // Find/act
		const textElement = screen.getByText(/0 todos/i);


	// Assert
	expect(headingElement).toBeVisible();
	expect(headingElement).toHaveTextContent(/welcome/i);
    expect(textElement).toBeVisible();
});
