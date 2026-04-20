/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./assets/scss/App.scss";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddTodoForm";
import Container from "react-bootstrap/Container";
import type { Todo } from "./types/Todo.types";
import TodoList from "./components/TodoList";
import { getTodos, createTodo } from "./services/TodosAPI";
import { Alert } from "react-bootstrap";



function App() {
  const [error, setError] = useState<string | false>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[] | null>(null); //if not data return to have a falsy value, empty array would confuse error generating

  const addTodo = async (title: string) => {
      try {
        //post todo paylot to API (no need to store it in data and use setstater)
        await createTodo({
          title: title,
          completed: false,
        })
        // setTodos(data)

      } catch (err) {
        console.error("get data error:", err)
        setError(err instanceof Error ? "Could not load:" + err.message : "you did something wrong in code") // err instanceof Error TS err.message for string
        console.log(error)
      }

    // const newTodo: Todo = {
    //   id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
    //   title: title,
    //   done: false,
    // };

    // setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  
  const removeTodo = (clickedId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== clickedId));
  };

  const toggleTodo = (clickedId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === clickedId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };


  useEffect( () => { //you cannot have async here as useEffect would return promise and useEffect only wants to return clean up function
    const getData = async () => { //store the fetching into a separate function to obey the row above
      try {
        const data = await getTodos()
        setTodos(data)

      } catch (err) {
        console.error("get data error:", err)
        setError(err instanceof Error ? "Could not load:" + err.message : "you did something wrong in code") // err instanceof Error TS err.message for string
        console.log(error)
      } finally{ //you can skip finally and have it after the try if
        setIsLoading(false)
      }
    }
    getData()
  },[])

  //Derived state
  const completedTodos = todos?.filter(t => t.completed) ?? []; // ? - after todos to allow it be undefined, ?? - if undefined default to an empty array
  const incompletedTodos = todos?.filter(t => !t.completed) ?? [];

  return (
      <Container>
      <h1>Todos</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {isLoading && <p>Loading todos...</p>}
        {!isLoading && !error && todos?.length === 0 && <p className="text-muted">No todos</p>} 
        {todos && ( //if todos is falsy, this will never run
          <>
          <h2 className="h5 mb-2">Todo items</h2> {/* Show visually h5 but respect screenreaders */}
                <TodoList todos={incompletedTodos} onRemoveTodo={removeTodo} onToggle={toggleTodo}/>

            <hr />
            <h2 className="h5 mb-2">Done items</h2> {/* Show visually h5 but respect screenreaders */}
                <TodoList todos={completedTodos} onRemoveTodo={removeTodo} onToggle={toggleTodo}/>

            <TodoCounter completed={todos.filter(t => t.completed).length} total={todos.length} />
            <hr />
          </>
        )}

        <AddNewTodoForm onAddTodo={addTodo} />
      </Container>
  );
}

export default App;
