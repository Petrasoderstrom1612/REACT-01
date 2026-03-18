import { useState } from 'react'

type AddNewTodoFormProps = {
  addTodo: (title: string) => void;
};

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({addTodo}) => {
  const [inputTitle, setInputTitle] = useState("")

  const handleFormSubmit = (e: React.SubmitEvent) => {
  console.log("submit form")
  e.preventDefault()

  if(!inputTitle) return

  addTodo(inputTitle);

  setInputTitle("")
  }

  return (
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
  )
}

export default AddNewTodoForm