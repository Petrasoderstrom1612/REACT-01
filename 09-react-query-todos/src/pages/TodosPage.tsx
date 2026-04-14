// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import * as TodosAPI from "../services/TodosAPI";
// import type { Todo } from "../types/Todo.types";

const TodosPage = () => {
	const {data: todos, error, isError, isLoading} = useQuery({ //renamed data
		queryKey: ["todos"],
		queryFn: TodosAPI.getTodos,
	});

	

	// const [error, setError] = useState<string | false>(false);
	// const [isLoading, setIsLoading] = useState(true);
	// const [todos, setTodos] = useState<Todo[] | null>(null);

	// const getTodos = async () => {
	// 	try {
	// 		const data = await TodosAPI.getTodos();

	// 		// Sort dem todos
	// 		const sortedTodos = data
	// 			.sort((a, b) => a.title.localeCompare(b.title))
	// 			.sort((a, b) => Number(a.completed) - Number(b.completed));

	// 		// Set sorted todos as state
	// 		setTodos(sortedTodos);

	// 	} catch (err) {
	// 		console.error("getTodos error:", err);
	// 		setError(err instanceof Error
	// 			? "Could not load todos from API: " + err.message
	// 			: "It's not me, it's you"
	// 		);
	// 	}

	// 	setIsLoading(false);
	// }

	// useEffect(() => {
	// 	// eslint-disable-next-line react-hooks/set-state-in-effect
	// 	getTodos();
	// }, []);

	return (
		<Container className="py-3">
			<h1>Todos</h1>

			{isError && <Alert variant="danger">{error.message}</Alert>}

			{isLoading && <p>Loading todos...</p>}

			{todos && (
				todos.length ? (
					<>
						<ListGroup className="todolist mb-4">
							{todos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									className={todo.completed ? "completed" : ""}
									key={todo.id}
									to={"/todos/" + todo.id}
								>
									<span className="todo-title">{todo.title}</span>
								</ListGroup.Item>
							))}
						</ListGroup>

						<TodoCounter
							completed={todos.filter(todo => todo.completed).length}
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

export default TodosPage;
