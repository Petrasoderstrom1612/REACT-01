import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

type AddNewTodoFormProps = {
  onAddTodo: (title: string) => void;
};

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({onAddTodo}) => {
  const [inputTitle, setInputTitle] = useState("")
  const trimmedValue = inputTitle.trim().length

  const handleFormSubmit = (e: React.SubmitEvent) => {
  console.log("submit form")
  e.preventDefault()

  if(!inputTitle) return

  onAddTodo(inputTitle.trim()); //stateSetter wrapped in a function INVOKED here

  setInputTitle("")
  }

  return (
    <Form onSubmit={handleFormSubmit} className="mb3">
        <div className="input-group">
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
            disabled={trimmedValue < 3}
            >
            Create
          </Button>
          </InputGroup>
          {trimmedValue > 0 && trimmedValue < 3 && <Form.Text className="text-danger text-small">Write at least 3 characters in order to submit your todo.</Form.Text>}
        </div>
    </Form>
  )
}

export default AddNewTodoForm