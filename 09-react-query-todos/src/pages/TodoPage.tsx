import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";
import { toast } from "react-toastify";

const TodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const navigate = useNavigate();

	const { id } = useParams();
	const todoId = Number(id);

	// Get todo from API
	const getTodo = async (id: number) => {
		// Reset state
		setError(false);
		setIsLoading(true);
		setTodo(null);

		// Make request to API (or try to...)
		try {
			const data = await TodosAPI.getTodo(id);
			setTodo(data);

		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("It's not me, it's you");
			}
		}

		setIsLoading(false);
	}

	const handleDeleteTodo = async (todo: Todo) => {
		// Reset state
		setError(false);

		try {
			// 💣 Nuke it
			await TodosAPI.deleteTodo(todo.id);

			// 🥂 Toast the user
			toast.success("Omg that felt good");

			// 🛳️ Navigate the user
			navigate("/todos", {
				replace: true,  // replace current entry in browser history with the new url
			});

		} catch (err) {
			console.error("Error thrown when deleting todo " + todo.id, err);
			setError(err instanceof Error
				? `Could not delete todo ${todo.id}: ${err.message}`
				: "It's not me, it's you"
			);
		}
	}

	const handleToggleTodo = async (todo: Todo) => {
		// Reset state
		setError(false);

		try {
			const data = await TodosAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			setTodo(data);

		} catch (err) {
			console.error("Error thrown when toggling todo " + todo.id, err);
			setError(err instanceof Error
				? `Could not toggle todo ${todo.id}: ${err.message}`
				: "It's not me, it's you"
			);
		}
	}

	useEffect(() => {
		// Load todo on mount
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodo(todoId);
	}, [todoId]);

	if (error) {
		return <Alert variant="warning">{error}</Alert>
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	return todo && (
		<>
			<h1>{todo.title}</h1>

			<p>
				<strong>Status:</strong>
				{" "}
				{todo.completed
					? <span className="completed">👌🏻 Completed</span>
					: <span className="not-completed">🥵 Not completed</span>}
			</p>

			<div className="buttons mb-3">
				{/* Toggle */}
				<Button
					onClick={() => handleToggleTodo(todo)}
					variant="success"
				>Toggle</Button>

				{/* Edit */}
				<Link
					className="btn btn-warning"
					role="button"
					to={`/todos/${todo.id}/edit`}
				>Edit</Link>

				{/* Delete */}
				<Button
					onClick={() => handleDeleteTodo(todo)}
					variant="danger"
				>Delete</Button>
			</div>

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary mt-3" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
