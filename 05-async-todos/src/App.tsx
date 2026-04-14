/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./assets/scss/App.scss";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddTodoForm";
import Container from "react-bootstrap/Container";
import type { Todo } from "./types/Todo.types";
import TodoList from "./components/TodoList";



function App() {
  const [error, setError] = useState<string | false>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([]); //the best practise below
  //const [todos, setTodos] = useState<Todo[] | null>(null); //if not data return to have a falsy value, empty array would confuse error generating

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
      title: title,
      done: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  
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


  useEffect( () => { //you cannot have async here as useEffect would return promise and useEffect only wants to return clean up function
    const getData = async () => { //store the fetching into a separate function to obey the row above
      try {
        const res = await fetch("http://localhost:3000/todos") //fetch is inbuild in all browsers nowadays
          if (!res.ok){ //without .then as we use async already notes if the server is on or not
            throw new Error("res was not ok")
          }
        const data: Todo[] = await res.json() // or as Todo[]
        setTodos(data)

      } catch (err) {
        console.error("get data error:", err)
        setError(err instanceof Error ? "Could not load:" + err.message : "you did something wrong in code") // err instanceof Error TS
        console.log(error)
      } finally{ //you can skip finally and have it after the try if
        setIsLoading(false)
      }
    }
    getData()
  },[])

  //Derived state
  const completedTodos = todos.filter(t => t.done)
  const incompletedTodos = todos.filter(t => !t.done)

  return (
      <Container>
      <h1>Todos</h1>
        {isLoading && <p>Loading todos...</p>}
        {!isLoading && !error && todos.length === 0 && <p className="text-muted">No todos</p>} 
        {!isLoading && !error && todos.length && ( //very important to ensure you are not in loading state and you do not have error
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
