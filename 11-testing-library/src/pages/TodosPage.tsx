import { useState } from "react";
import Container from "react-bootstrap/Container";
import AddTodoForm from "../components/AddTodoForm";
import TodoCounter from "../components/TodoCounter";
import TodoList from "../components/TodoList";
import type { Todo } from "../types/Todo.types";

const initialTodos: Todo[] = [
	{ id: 1, title: "Make coffee", completed: true },
	{ id: 2, title: "Drink coffee", completed: false },
	{ id: 3, title: "Drink MOAR coffee", completed: false },
	{ id: 4, title: "Drink ALL ZE coffee", completed: false },
];

export const TodosPage = () => {
	const [todos, setTodos] = useState(initialTodos);

	const handleAddTodo = (newTodoTitle: string) => {
		// Create a new todo and set a new list of todos containing the
		// previous todos + the new todo
		setTodos([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: newTodoTitle,
			completed: false,
		}]);
	}

	const handleDeleteTodo = (todo: Todo) => {
		setTodos(todos.filter(t => t.id !== todo.id));
	}

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed;
		setTodos([...todos]);
	}

	// Derive list of completed/incompleted todos from the `todos` state
	const completedTodos = todos.filter(todo => todo.completed);
	const incompleteTodos = todos.filter(todo => !todo.completed);

	return (
		<Container className="py-2">
			<h1>🧪👩‍🔬 Simple Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

			{todos.length ? (
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
			)}
		</Container>
	);
}

export default TodosPage;
