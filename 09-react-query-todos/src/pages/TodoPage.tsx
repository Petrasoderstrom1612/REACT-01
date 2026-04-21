import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";
// import GlobalLoadingSpinner from "../components/spinners/GlobalLoadingSpinner";

const TodoPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const todoId = Number(id);
	const { data: todo, error, isError, isLoading, refetch } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
	});

	// TODO: Replace with mutation
	const handleDeleteTodo = async (todo: Todo) => {
		// setError(false);

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
			// setError(err instanceof Error
			// 	? `Could not delete todo ${todo.id}: ${err.message}`
			// 	: "It's not me, it's you"
			// );
		}
	}

	// TODO: Replace with mutation
	const handleToggleTodo = async (todo: Todo) => {
		// Reset state
		// setError(false);

		try {
			await TodosAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			// setTodo(data);
			refetch()

		} catch (err) {
			console.error("Error thrown when toggling todo " + todo.id, err);
			// setError(err instanceof Error
			// 	? `Could not toggle todo ${todo.id}: ${err.message}`
			// 	: "It's not me, it's you"
			// );
		}
	}

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>
	}

	// if (isLoading) {
	// 	return <GlobalLoadingSpinner/>
	// }

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