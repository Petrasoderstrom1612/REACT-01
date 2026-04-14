import { useEffect, useState } from "react";
import "./assets/App.scss";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddTodoForm";
import Container from "react-bootstrap/Container";
import type { Todo } from "./types/Todo.types";
import TodoList from "./components/TodoList";



function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  useEffect( () => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/todos")
      if (res.ok){
        throw new Error("res was not ok")
      }
      const data: Todo[] = await res.json() // or as Todo[]
      setTodos(data)
    }

    getData()
  },[])

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
                <TodoList todos={incompletedTodos} onRemoveTodo={removeTodo} onToggle={toggleTodo}/>

            <hr />
            <h2 className="h5 mb-2">Done items</h2> {/* Show visually h5 but respect screenreaders */}
                <TodoList todos={completedTodos} onRemoveTodo={removeTodo} onToggle={toggleTodo}/>

            <TodoCounter completed={todos.filter(t => t.done).length} total={todos.length} />
            <hr />
          </>
        )}

        <AddNewTodoForm onAddTodo={addTodo} />
      </Container>
  );
}

export default App;
