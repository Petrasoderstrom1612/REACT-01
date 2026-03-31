import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

interface AddTodoFormProps {
	onAddTodo: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
	const [inputTodoTitle, setInputTodoTitle] = useState("");
	const inputTodoTitleRef = useRef<HTMLInputElement>(null);
	const trimmedInputTodoTitle = inputTodoTitle.trim();

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// 🙋 Tell parent that someone wants to create a new todo with the title `trimmedInputTodoTitle`
		onAddTodo(trimmedInputTodoTitle);

		// Clear input field
		setInputTodoTitle("");

		// Focus on input element after submit
		inputTodoTitleRef.current?.focus();
	}

	useEffect(() => {
		// Focus on input element after submit
		inputTodoTitleRef.current?.focus();
	}, []);

	return (
		<Form onSubmit={handleSubmit} className="mb-3">
			<InputGroup>
				<Form.Control
					aria-label="New todo title"
					onChange={e => setInputTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					ref={inputTodoTitleRef}
					value={inputTodoTitle}
					required
				/>
				<Button
					disabled={trimmedInputTodoTitle.length < 3}
					type="submit"
					variant="success"
				>Create</Button>
			</InputGroup>

			{trimmedInputTodoTitle.length > 0 && trimmedInputTodoTitle.length < 3 && (
				<Form.Text className="text-danger text-small">That's a too short todo, better do it right away instead!</Form.Text>
			)}
		</Form>
	)
}

export default AddTodoForm;
