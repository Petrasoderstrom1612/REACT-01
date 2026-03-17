import { useState } from 'react'
import "./assets/App.scss";
import TodoCounter from './components/TodoCounter';

export interface Todo {
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

const toggleTodo = (clickedId: number) => {
  setTodos(prevTodos => prevTodos.map(todo =>
    todo.id === clickedId ? {...todo, done: !todo.done} : todo
  ))
}

  return (
    <>
    <h1>Todos</h1>
    <div className="container">
      {todos.length === 0 && <p>No todos</p>}
      {todos.length > 0 && (
        <>
          {todos.map(todo => <ul>
            <li onClick={() => { toggleTodo(todo.id); } } className={todo.done ? "done" : undefined}>
              {todo.done ? "✅" : undefined} {todo.title}
              <button
                title="trash-bin"
                className="btn btn-danger ms-3"
                onClick={() => removeTodo(todo.id)}>🗑️</button>
            </li>
          </ul>)}
          <TodoCounter todos={todos}/>
          <hr></hr>
        </>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="input-group mb3">
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
            disabled={inputTitle.length < 3}
            >
            Create
          </button>
          {inputTitle.length < 3 && <p className="input-group ms-4">Write at least 3 characters in order to submit your todo.</p>}
        </div>
      </form>
    </div></>
  )
}

export default App
