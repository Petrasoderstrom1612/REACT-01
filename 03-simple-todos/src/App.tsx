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
const [inputTitle, setInputTitle] = useState("")

const handleFormSubmit = (e: React.SubmitEvent) => {
  console.log("submit form")
  e.preventDefault()

  if(!inputTitle) return

  const newTodo: Todo = {
    id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
    title: inputTitle,
    done: false
  }

  setTodos(prevTodos => [...prevTodos, newTodo])

  setInputTitle("")
}

const removeTodo = (clickedId: number) => {
  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== clickedId))
}

  return (
    <div className="container">
      {todos.length === 0 && <p>No todos</p>}
      {todos.length > 0 && (
        <>
          {todos.map(todo => <ul>
            <li>
              {todo.title}
              <button
                title="trash-bin"
                className="btn btn-danger"
                onClick={() => removeTodo(todo.id)}>🗑️</button>
            </li>
          </ul>)}
          <p>{todos.filter(t => t.done).length} av {todos.length} avklarade</p>
          <hr></hr>
        </>
      )}
 
    <form onSubmit={handleFormSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Write your todo here"
            aria-label="to-do"
            required
            title="to-do"
            onChange={(e) => setInputTitle(e.target.value)}
            value={inputTitle} />
          <button
            className="btn btn-success btn-sm ms-1"
            type="submit"
            disabled={!inputTitle}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
