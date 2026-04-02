import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useParams } from "react-router";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const TodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const navigate = useNavigate();

	const {id} = useParams(); //a way to grab something from url if you write /lol after lol it will show <div>Todo id {id}</div>
    const todoId = Number(id) //axios expects number

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

	const handleToggleTodo = async (todo: Todo) => {
		setError(false);

		try {
			const todoData = await TodosAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			// await getTodos();
			setTodo(todoData)

		} catch (err) {
			console.error("Error thrown when toggling todo " + todo.id, err);
			setError(err instanceof Error
				? `Could not toggle todo ${todo.id}: ${err.message}`
				: "It's not me, it's you"
			);
		}
	}

	const handleDeleteTodo = async (todo: Todo) => {
		setError(false);

		try {
			await TodosAPI.deleteTodo(todo.id);
			// await getTodos();
			toast.success("Omg that felt good");
			navigate("/todos", {replace: true}) //replace current entry in browser history with new url

		} catch (err) {
			console.error("Error thrown when deleting todo " + todo.id, err);
			setError(err instanceof Error
				? `Could not delete todo ${todo.id}: ${err.message}`
				: "It's not me, it's you"
			);
		}
	}

	useEffect(() => {
		// Load todo on mount
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodo(todoId);
	}, [todoId]); //if it was empty, then React would not know when the id would change, it would only render once


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
				{/* Edit */}
			<Link
					className="btn btn-warning"
					role="button"
					to={`/todos/${todo.id}/edit`}
				>Edit</Link>

			<div className="buttons mb-3">
				{/* Toggle */}
			<Button variant="success" onClick={() => handleToggleTodo(todo)}>Toggle</Button> {/* Guarantee you have todo true as in ternary */}
				{/* Delete */}
			<Button variant="danger" onClick={() => handleDeleteTodo(todo)}>Delete</Button> {/* Guarantee you have todo true as in ternary */}
			</div>

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary mt-3" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
