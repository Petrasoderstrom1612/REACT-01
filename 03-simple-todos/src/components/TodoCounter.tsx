// import React from 'react'
import type { Todo } from "../App"

interface TodoCounterProps {
    todos: Todo[]
}

const TodoCounter: React.FC<TodoCounterProps> = ({todos}) => {
  return (
    <p>{todos.filter(t => t.done).length} av {todos.length} avklarade</p>
  )
}

export default TodoCounter