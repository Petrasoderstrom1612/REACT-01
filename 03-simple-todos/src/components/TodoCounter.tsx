// import React from 'react'
import type { Todo } from "../App"

interface TodoCounterProps {
  completed: number;
  total: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({completed, total}) => {
  return (
    <p>{completed} av {total === 1 ? "avklarad" : "avklarade"}</p>
  )
}

export default TodoCounter
{/* <p>{todos.filter(t => t.done).length} av {todos.length} avklarade</p> */}