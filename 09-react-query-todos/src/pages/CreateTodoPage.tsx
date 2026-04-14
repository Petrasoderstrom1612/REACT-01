import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router";
import AddTodoForm from "../components/AddTodoForm";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";

const CreateTodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);

	const handleAddTodo = async (title: string) => {
		// Reset state
		setCreatedTodo(null);
		setError(false);

		try {
			// Post todo payload to API
			const data = await TodosAPI.createTodo({
				title,
				completed: false,
			});
			setCreatedTodo(data);

			console.log("Created todo, yay!!!");

		} catch (err) {
			console.error("Error thrown when creating todo:", err);
			setError(err instanceof Error
				? "Could not create todo: " + err.message
				: "It's not me, it's you"
			);
		}
	}

	return (
		<>
			<h1>Create a new Todo</h1>

			{error && <Alert variant="danger">{error}</Alert>}

			<AddTodoForm onAddTodo={handleAddTodo} />

			{createdTodo && (
				<Alert variant="success">
					<h2>Todo successfully created ✨</h2>

					<Link to={"/todos/" + createdTodo.id} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default CreateTodoPage;
