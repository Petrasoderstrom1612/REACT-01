import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "../types/Todo.types";

interface TodoListItemProps {
	onRemoveTodo: (clickedId: number) => void,
	onToggle: (clickedId: number) => void,
	todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ onRemoveTodo, onToggle, todo }) => {
	return (
		<ListGroup.Item
			className={todo.done ? "completed" : ""}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<Button
					onClick={() => onToggle(todo.id)}
					size="sm"
					variant="outline-warning"
				>Toggle</Button>
				<Button
					onClick={() => onRemoveTodo(todo.id)}
					size="sm"
					variant="outline-danger"
				>Delete</Button>
			</div>
		</ListGroup.Item>
	)
}

export default TodoListItem;
