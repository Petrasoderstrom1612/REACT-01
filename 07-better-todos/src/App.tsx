import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Navigation from "./pages/partials/Navigation";
import CreateTodoPage from "./pages/CreateTodoPage";
import TodoPage from "./pages/TodoPage";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

	return (
		<>
			<Navigation />
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/create" element={<CreateTodoPage/>} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
