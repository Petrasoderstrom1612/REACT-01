import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";
import { toast } from "react-toastify";

const EditTodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [inputTodoTitle, setInputTodoTitle] = useState("");
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
            setInputTodoTitle(data.title)
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

	const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        await TodosAPI.updateTodo(todoId, {
            title: inputTodoTitle,
        })

        toast.success("Todo saved")

        navigate("/todos/" + todoId)
	}

	useEffect(() => {
		// Load todo on mount
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodo(todoId);
	}, [todoId]);

	if (error && !todo) {
		return <Alert variant="warning">{error}</Alert>
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	return todo && (
		<>
			<h1>Edit: {todo.title}</h1>

			{/* Errors */}
			{error && <Alert variant="danger">{error}</Alert>}

			{/* Edit Form */}
			<Form onSubmit={handleSubmit} className="mb-4">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Buy milk"
						onChange={e => setInputTodoTitle(e.target.value)}
						value={inputTodoTitle}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			{/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary mt-3" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default EditTodoPage;
