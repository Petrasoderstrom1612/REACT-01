import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import * as TodosAPI from "../services/TodosAPI";
import type { Todo } from "../types/Todo.types";
import TodoCounter from "../components/TodoCounter";
import CreateTodoPage from "./CreateTodoPage";

const TodosPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	const getTodos = async () => {
		try {
			const data = await TodosAPI.getTodos();
			setTodos(data);

		} catch (err) {
			console.error("getTodos error:", err);
			setError(err instanceof Error
				? "Could not load todos from API: " + err.message
				: "It's not me, it's you"
			);
		}

		setIsLoading(false);
	}

	const handleAddTodo = async (title: string) => {
		try {
			// Post todo payload to API
			const createdTodo = await TodosAPI.createTodo({
				title,
				completed: false,
			});
			console.log("Created todo, yay!!! Reloading todos...");

			setTodos([...todos ?? [], createdTodo]);

		} catch (err) {
			console.error("Error thrown when creating todo:", err);
			setError(err instanceof Error
				? "Could not create todo: " + err.message
				: "It's not me, it's you"
			);
		}
	}

	// const handleDeleteTodo = async (todo: Todo) => {
	// 	try {
	// 		await TodosAPI.deleteTodo(todo.id);
	// 		await getTodos();

	// 	} catch (err) {
	// 		console.error("Error thrown when deleting todo " + todo.id, err);
	// 		setError(err instanceof Error
	// 			? `Could not delete todo ${todo.id}: ${err.message}`
	// 			: "It's not me, it's you"
	// 		);
	// 	}
	// }

	// const handleToggleTodo = async (todo: Todo) => {
	// 	try {
	// 		await TodosAPI.updateTodo(todo.id, {
	// 			completed: !todo.completed,
	// 		});
	// 		await getTodos();

	// 	} catch (err) {
	// 		console.error("Error thrown when toggling todo " + todo.id, err);
	// 		setError(err instanceof Error
	// 			? `Could not toggle todo ${todo.id}: ${err.message}`
	// 			: "It's not me, it's you"
	// 		);
	// 	}
	// }

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodos();
	}, []);

	return (
		<Container className="py-3">
			<h1>Todos</h1>
			<CreateTodoPage/>

			{error && <Alert variant="danger">{error}</Alert>}

			{isLoading && <p>Loading todos...</p>}

			{todos && (
				todos.length ? (
					<>
						<TodoCounter
							completed={todos.filter(todo => todo.completed).length}
							total={todos.length}
						/>
						<ListGroup className="todolist mb-4">
							{todos.map(todo => (
								<ListGroup.Item
									action // means it is clickable
									as={Link}
									className={todo.completed ? "completed" : ""}
									key={todo.id}
									to={"/todos/" + todo.id}
								>
									<span className="todo-title">{todo.title}</span>
								</ListGroup.Item>
							))}
						</ListGroup>
					</>
				) : (
					<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
				)
				
			)}
		</Container>
	);
}

export default TodosPage;
