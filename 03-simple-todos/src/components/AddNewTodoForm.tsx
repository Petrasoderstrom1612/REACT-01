import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

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
    <Form onSubmit={handleFormSubmit}>
        <div className="input-group mb3">
          <InputGroup className="mb-3">
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Write your todo here"
            aria-label="new to-do"
            required
            title="to-do"
            onChange={(e) => setInputTitle(e.target.value)}
            value={inputTitle} />
          <Button
            variant="success" //needed so the button aligns in the input wrapper
            type="submit"
            disabled={inputTitle.trim().length < 3}
            >
            Create
          </Button>
          </InputGroup>
          {inputTitle.length < 3 && <p className="input-group ms-4">Write at least 3 characters in order to submit your todo.</p>}
        </div>
    </Form>
  )
}

export default AddNewTodoForm