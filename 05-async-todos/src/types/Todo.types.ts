export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export type CreateTodoPayload = Omit<Todo, "id">;
/*
export interface CreateTodoPayload {
	title: string;
	completed: boolean;
}
*/



export type UpdateTodoPayload = Partial<CreateTodoPayload>; //Partial means all properties are optional
/*
export interface UpdateTodoPayload {
	title?: string;
	completed?: boolean;
}
*/
