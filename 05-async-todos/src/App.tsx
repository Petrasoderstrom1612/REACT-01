/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./assets/scss/App.scss";
import TodoCounter from "./components/TodoCounter";
import AddNewTodoForm from "./components/AddTodoForm";
import Container from "react-bootstrap/Container";
import type { Todo } from "./types/Todo.types";
import TodoList from "./components/TodoList";
// import { getTodos, createTodo } from "./services/TodosAPI";
import * as TodosAPI from "./services/TodosAPI";
import { Alert } from "react-bootstrap";



function App() {
  const [error, setError] = useState<string | false>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[] | null>(null); //if not data return to have a falsy value, empty array would confuse error generating

  const removeTodo = async (clickedId: number) => {
    try {
      await TodosAPI.deleteTodo(clickedId)
      await getTodos() //await so it waits for the row above
    // setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== clickedId));
    } catch (err) {
      console.error("error thrown when removing todo: "+ clickedId, err)
      setError(err instanceof Error ? "Could not delete:"+ clickedId + err.message : "you did something wrong in code") // err instanceof Error TS err.message for string
      console.log(error)
    }
  };

  const toggleTodo = async (clickedId: number,todo: Todo) => {
    try {
      await TodosAPI.patchTodo(clickedId,todo)
      await getTodos() //await so it waits for the row above
    // setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== clickedId));
    } catch (err) {
      console.error("get data error:", err)
      setError(err instanceof Error ? "Could not load:" + err.message : "you did something wrong in code") // err instanceof Error TS err.message for string
      console.log(error)
    }

    // setTodos((prevTodos) =>
    //   prevTodos.map((todo) =>
    //     todo.id === clickedId ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // );
  };

  const addTodo = async (title: string) => {
      try {
        //post todo paylot to API (no need to store it in data and use setstater)
        await TodosAPI.createTodo({ //const newTodo = 
          title: title,
          completed: false,
        })
        // setTodos((prevTodos) => [...prevTodos ?? [], newTodo]); //if prevTodos is null, make an empty array
        getTodos() 

      } catch (err) {
        console.error("get data error:", err)
        setError(err instanceof Error ? "Could not load:" + err.message : "you did something wrong in code") // err instanceof Error TS err.message for string
        console.log(error)
      }
  };
  
  useEffect( () => { //you cannot have async here as useEffect would return promise and useEffect only wants to return clean up function
    getTodos()
  },[])
  
  const getTodos = async () => { //store the fetching into a separate function to obey the row above
    try {
      const data = await TodosAPI.getTodos()
      setTodos(data)

    } catch (err) {
      console.error("get data error:", err)
      setError(err instanceof Error ? "Could not load:" + err.message : "you did something wrong in code") // err instanceof Error TS err.message for string
      console.log(error)
    } finally{ //you can skip finally and have it after the try if
      setIsLoading(false)
    }
  }


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
