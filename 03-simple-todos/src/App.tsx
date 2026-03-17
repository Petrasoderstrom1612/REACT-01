import { useState } from 'react'
import "./assets/App.scss";

interface Todo {
  id: number;
  title: string;
  done: boolean
}

function App() {
const [todos, setTodos] = useState<Todo[]>([
  {id: 1, title: "first to-do", done:false},
  {id: 2, title: "second to-do", done:false},
  {id: 3, title: "thirds to-do", done:false},
])

  return (
    <div className="container">
      {todos.map(todo => <ul>
        <li>{todo.title}</li>
      </ul>)}
      <p>Total done {todos.filter(t => t.done).length}/{todos.length}</p>
      <hr></hr>
    </div>
  )
}

export default App
