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

const handleFormSubmit = () => {
  console.log("submit form")
}

  return (
    <><div className="container">
      {todos.map(todo => <ul>
        <li>{todo.title}</li>
      </ul>)}
      <p>{todos.filter(t => t.done).length} av {todos.length} avklarade</p>
      <hr></hr>
    </div>
    <form onSubmit={handleFormSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="this is my post"
            aria-label="post"
            required
            title="post"
            ref={inputPostTitleRef} />
          <button
            className="btn btn-success btn-sm ms-1"
            type="submit"
            disabled={!inputTitle}
          >
            Create
          </button>
        </div>
      </form></>
  )
}

export default App
