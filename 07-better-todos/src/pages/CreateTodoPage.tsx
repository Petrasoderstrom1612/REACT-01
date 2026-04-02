import AddTodoForm from "../components/AddTodoForm";
import * as TodosAPI from "../services/TodosAPI"
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router";
import {  useState } from "react";
import type { Todo } from "../types/Todo.types";


const CreateTodoPage  = () => {
  const [error, setError] = useState<string | false>(false);
  const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);

	const handleAddTodo = async (title: string) => {
    setCreatedTodo(null);
		setError(false);

		try {
			// Post todo payload to API
			const createdTodo = await TodosAPI.createTodo({
				title,
				completed: false,
			});
			console.log("Created todo, yay!!! Reloading todos...");
      setCreatedTodo(createdTodo);
			// setTodos([...todos ?? [], createdTodo]);
      console.log(createdTodo)

		} catch (err) {
			console.error("Error thrown when creating todo:", err);
			setError(err instanceof Error
				? "Could not create todo: " + err.message
				: "It's not me, it's you"
			);
		}
	}
    
  return (
    <>
    			
      {error && <Alert variant="danger">{error}</Alert>}

       <AddTodoForm onAddTodo={handleAddTodo} />

      {/* If you close backend server, it will be false, good for testing */}
      {createdTodo && (
				<Alert variant="success">
					<h2>Todo successfully created ✨</h2>
          <Link to={"/todos/" + createdTodo.id} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

      {/* Back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
    </>
  )
}

export default CreateTodoPage
