import { useState } from "react";
import "./assets/App.scss";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddNewTodoForm";
import { Container } from "react-bootstrap";

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "first to-do", done: false },
    { id: 2, title: "second to-do", done: false },
    { id: 3, title: "thirds to-do", done: false },
  ]);

  const removeTodo = (clickedId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== clickedId));
  };

  const toggleTodo = (clickedId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === clickedId ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
      title,
      done: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
      <Container>
      <h1>Todos</h1>
        {todos.length === 0 && <p>No todos</p>}
        {todos.length > 0 && (
          <>
            {todos
              .filter((todo) => !todo.done)
              .map((todo) => (
                <ul key={todo.id}>
                  <li
                    onClick={() => {
                      toggleTodo(todo.id);
                    }}
                    className={todo.done ? "done" : undefined}
                  >
                    {todo.done ? "✅" : undefined} {todo.title}
                    <button
                      type="button"
                      title="trash-bin"
                      className="btn btn-danger ms-3"
                      onClick={() => removeTodo(todo.id)}
                    >
                      🗑️
                    </button>
                  </li>
                </ul>
              ))}
            <hr />
            {todos
              .filter((todo) => todo.done)
              .map((todo) => (
                <ul key={todo.id}>
                  <li
                    onClick={() => {
                      toggleTodo(todo.id);
                    }}
                    className={todo.done ? "done" : undefined}
                  >
                    {todo.done ? "✅" : undefined} {todo.title}
                    <button
                      type="button"
                      title="trash-bin"
                      className="btn btn-danger ms-3"
                      onClick={() => removeTodo(todo.id)}
                    >
                      🗑️
                    </button>
                  </li>
                </ul>
              ))}
            <TodoCounter todos={todos} />
            <hr />
          </>
        )}

        <AddNewTodoForm addTodo={addTodo} />
      </Container>
  );
}

export default App;
