import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useParams } from "react-router";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";

const TodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);

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

			<p><strong>Status:</strong> {todo.completed ? "Completed" : "Not completed"}</p>

			<div className="buttons mb-3">
				{/* Toggle */}

				{/* Delete */}
			</div>

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
