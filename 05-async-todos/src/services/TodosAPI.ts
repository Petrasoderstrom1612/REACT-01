//inte TSX för att du inte returnerar JSX
//SERVICE FOR COMMUNICATING WITH THE JSON-SERVER BACKEND
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from "../types/Todo.types";
import axios from "axios"

const BASE_URL = "http://localhost:3000";

// export const getTodosFetch = async() => {

// 	const res = await fetch(BASE_URL + "/todos") //fetch is inbuild in all browsers nowadays
// 	if (!res.ok){ //without .then as we use async already notes if the server is on or not
// 		throw new Error("res was not ok")
// 	}
// 	const data: Todo[] = await res.json() // or as Todo[]
// 	return data
	
// }

export const getTodos = async() => {

	const res = await axios.get<Todo[]>(BASE_URL + "/todos") //same as fetch but you add .get and type
	return res.data //.data includes body converted from json
	
}

export const createTodo = async(payload: CreateTodoPayload) => { //you do not send id, it is API that has controll over it hence ommitted from type

	const res = await axios.post<Todo>(BASE_URL + "/todos", payload) //same as fetch but you add .get and type
	return res.data //.data includes body converted from json
	
}

export const deleteTodo = async (id: number) => {
	const res = await axios.delete<Todo>(BASE_URL + "/todos/" + id) //this API returns empty object and status 200 OK
	return res.data 
}

export const patchTodo = async (id: number, payload: UpdateTodoPayload) => {
	const res = await axios.patch<Todo>(BASE_URL + "/todos/" + id, payload)
	return res.data
}