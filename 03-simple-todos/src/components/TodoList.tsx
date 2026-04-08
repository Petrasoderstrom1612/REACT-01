import React from 'react' //the only purpose of this file is to avoid mapping twice in map and having ListGroup wrapper twice there
import type { Todo } from '../types/Todo.types'
import TodoListItem from './TodoListItem'
import { ListGroup } from 'react-bootstrap';

type TodoListProps = {
    todos: Todo[];
    onRemoveTodo: (clickedId: number) => void;
    onToggleTodo: (clickedId: number) => void;
}

const TodoList: React.FC<TodoListProps>  = ({todos, onRemoveTodo, onToggleTodo}) => {
  return (
    <ListGroup>
    {todos.map((todo) => 
     <TodoListItem
        key={todo.id}
        todo={todo}
        onRemoveTodo={onRemoveTodo} //repeating exact same name you came up with as propname in app, propdrilling to child
        onToggleTodo={onToggleTodo} //repeating exact same name you came up with as propname in app, propdrilling to child
     /> 
     )}
    </ListGroup>
  )
}

export default TodoList