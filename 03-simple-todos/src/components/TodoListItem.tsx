import React from 'react'
import { Button, ListGroup } from "react-bootstrap";
import type { Todo } from '../types/Todo.types';

type TodoListItemProps = {
    todo: Todo;
    onRemoveTodo: (clickedId: number) => void;
    onToggleTodo: (clickedId: number) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({onRemoveTodo, onToggleTodo, todo}) => {
  return (    
    <ListGroup className="todolist">
        <ListGroup.Item className={`${todo.done ? "done" : ""}`} >
        <p className="todo-title">{todo.done ? "✅" : undefined} {todo.title}</p>
        <div>
            <Button
            size="sm"
            variant="outline-warning"
            onClick={() => {onToggleTodo(todo.id);}}
            >
            Toggle
            </Button>
            <Button
                type="button"
                title="trash-bin"                      
                size="sm"
                variant="outline-danger"
                onClick={() => onRemoveTodo(todo.id)}
                >
                🗑️
            </Button>
        </div>
        </ListGroup.Item>
    </ListGroup>
  )
}

export default TodoListItem