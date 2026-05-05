import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import NotFoundPage from "./NotFoundPage";

it("Displays that the page could not be found", () => {
	// Render/Arrange
	render(<NotFoundPage />);

	// Find/Act
	//searching on the entire screen const headingElement = screen.getByText(/page could not be found/i); //i i regex means case insensitive
    const headingElement = screen.getByRole("heading") //does a page have a heading? to be accessible

	// Assert/Assert
    expect(headingElement).toBeVisible(); //if we would have inline style or display to hide it or none
    expect(headingElement).toHaveTextContent(/page could not be found/i)
});
