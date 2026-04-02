import AddTodoForm from "../components/AddTodoForm";
import * as TodosAPI from "../services/TodosAPI"


const CreateTodoPage  = () => {


const handleAddTodo = async (title: string) => {
    await TodosAPI.createTodo({ title, completed: false})
}
    
  return (
    <AddTodoForm onAddTodo={handleAddTodo} />
  )
}

export default CreateTodoPage
