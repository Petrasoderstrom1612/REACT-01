import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodosAPI from "./services/TodosAPI";
import type { Todo } from "./types/Todo.types";
import "./assets/scss/App.scss";

function App() {
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

	const handleDeleteTodo = async (todo: Todo) => {
		try {
			await TodosAPI.deleteTodo(todo.id);
			await getTodos();

		} catch (err) {
			console.error("Error thrown when deleting todo " + todo.id, err);
			setError(err instanceof Error
				? `Could not delete todo ${todo.id}: ${err.message}`
				: "It's not me, it's you"
			);
		}
	}

	const handleToggleTodo = async (todo: Todo) => {
		try {
			await TodosAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			await getTodos();

		} catch (err) {
			console.error("Error thrown when toggling todo " + todo.id, err);
			setError(err instanceof Error
				? `Could not toggle todo ${todo.id}: ${err.message}`
				: "It's not me, it's you"
			);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodos();
	}, []);

	// Derive list of completed/incompleted todos from the `todos` state
	const completedTodos = todos?.filter(todo => todo.completed) ?? [];
	const incompleteTodos = todos?.filter(todo => !todo.completed) ?? [];

	return (
		<Container className="py-3">
			<h1>Better Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

			{error && <Alert variant="danger">{error}</Alert>}

			{isLoading && <p>Loading todos...</p>}

			{todos && (
				todos.length ? (
					<>
						<h2 className="h5 mb-2">💪🏻 Stuff I got to do</h2>
						<TodoList
							onDelete={handleDeleteTodo}
							onToggle={handleToggleTodo}
							todos={incompleteTodos}
						/>

						<h2 className="h5 mb-2">🥺 Stuff I've done</h2>
						<TodoList
							onDelete={handleDeleteTodo}
							onToggle={handleToggleTodo}
							todos={completedTodos}
						/>

						<TodoCounter
							completed={completedTodos.length}
							total={todos.length}
						/>
					</>
				) : (
					<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
				)
			)}
		</Container>
	);
}

export default App;
