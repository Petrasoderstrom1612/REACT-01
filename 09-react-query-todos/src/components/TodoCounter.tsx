interface TodoCounterProps {
	completed: number;
	total: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({ completed, total }) => {
	return (
		<p className="text-muted">
			{completed} of {total} {total === 1 ? "todo" : "todos"} completed.
		</p>
	)
}

export default TodoCounter;
