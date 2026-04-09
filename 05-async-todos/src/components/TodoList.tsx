import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "../types/Todo.types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
	onRemoveTodo: (clickedId: number) => void;
	onToggle: (clickedId: number) => void;
	todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ onRemoveTodo, onToggle, todos }) => {
	return (
		<ListGroup className="todolist mb-3">
			{todos.map(todo => (
				<TodoListItem
					key={todo.id}
					onRemoveTodo={onRemoveTodo}
					onToggle={onToggle}
					todo={todo}
				/>
			))}
		</ListGroup>
	)
}

export default TodoList;
