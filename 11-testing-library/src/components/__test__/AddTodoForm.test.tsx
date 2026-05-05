import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithUserInteraction } from "../../tests/render-utils";
import AddTodoForm from "../AddTodoForm";

const mockOnAddTodo = () => {}
const todoTitle = "This is my todo title";

describe("Todo Form", () => {
	it("Renders input field initially empty", () => {
		// Render/arrange
		render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// Assert
		expect(inputElement).toHaveValue("");
	});

	it("Can type into input field", async () => {
		// Render/arrange with user interaction
		const { user } = renderWithUserInteraction(<AddTodoForm onAddTodo={mockOnAddTodo} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// Interact
		await user.type(inputElement, todoTitle);

		// Assert
		expect(inputElement).toHaveValue(todoTitle);
	});

	it("Empties input field after clicking on the 'Create' button", async () => {
		// Render/arrange with user interaction
		const { user } = renderWithUserInteraction(<AddTodoForm onAddTodo={mockOnAddTodo} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");
		const btnCreateElement = screen.getByRole("button", { name: /create/i });  // Since we have two buttons, we have to say which one we want

		// Interact
		await user.type(inputElement, todoTitle);
		await user.click(btnCreateElement);

		// Assert
		expect(inputElement).toHaveValue("");
	});

    	it("Doesn't show validation error if input is valid", async () => {
		// Render/arrange with user interaction
		const { user } = renderWithUserInteraction(<AddTodoForm onAddTodo={mockOnAddTodo} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// Interact
		await user.type(inputElement, todoTitle);
		await user.type(inputElement, "{Enter}");

		// Find/act (again)
		const validationErrorElement = screen.queryByRole("paragraph");  // 🔔 Must use `queryBy...` to test for the **ABSENCE** of an element

		// Assert
		expect(validationErrorElement).not.toBeInTheDocument();
	});

    describe("Todo Form validation", () => {
	it("Shows validation error if input is too short", async () => {
		// Render/arrange with user interaction
		const { user } = renderWithUserInteraction(<AddTodoForm onAddTodo={mockOnAddTodo} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// Interact
		await user.type(inputElement, "a");
		await user.type(inputElement, "{Enter}");

		// Find/act (again)
		const validationErrorElement = screen.getByRole("paragraph");

		// Assert
		expect(validationErrorElement).toBeVisible();
		expect(validationErrorElement).toHaveTextContent(/too short/i);
	});
});
