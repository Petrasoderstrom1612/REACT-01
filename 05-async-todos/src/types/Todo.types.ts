export interface Todo {
	id: number;
	title: string;
	done: boolean;
}

export type CreateTodoPayload = Omit<Todo, "id">;

/*
export interface CreateTodoPayload {
	title: string;
	completed: boolean;
}
*/


/*
export interface UpdateTodoPayload {
	title?: string;
	completed?: boolean;
}
*/

export type UpdateTodoPayload = Partial<CreateTodoPayload>;
