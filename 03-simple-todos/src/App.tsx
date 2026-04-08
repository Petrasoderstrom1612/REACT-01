import { useState } from "react";
import "./assets/App.scss";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddNewTodoForm";
import Container from "react-bootstrap/Container";
import type { Todo } from "./types/Todo.types";
import TodoList from "./components/TodoList";


const initialTodos: Todo[] = [
    { id: 1, title: "first to-do", done: false },
    { id: 2, title: "second to-do", done: false },
    { id: 3, title: "thirds to-do", done: false },
  ]

function App() {
  const [todos, setTodos] = useState(initialTodos);

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
      title: title,
      done: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  //Derived state
  const completedTodos = todos.filter(t => t.done)
  const incompletedTodos = todos.filter(t => !t.done)

  return (
      <Container>
      <h1>Todos</h1>
        {todos.length === 0 && <p className="text-muted">No todos</p>}
        {todos.length && (
          <>
          <h2 className="h5 mb-2">Todo items</h2> {/* Show visually h5 but respect screenreaders */}
                <TodoList todos={incompletedTodos} onRemoveTodo={removeTodo} onToggleTodo={toggleTodo}/>

            <hr />
            <h2 className="h5 mb-2">Done items</h2> {/* Show visually h5 but respect screenreaders */}
                <TodoList todos={completedTodos} onRemoveTodo={removeTodo} onToggleTodo={toggleTodo}/>

            <TodoCounter completed={todos.filter(t => t.done).length} total={todos.length} />
            <hr />
          </>
        )}

        <AddNewTodoForm onAddTodo={addTodo} />
      </Container>
  );
}

export default App;
