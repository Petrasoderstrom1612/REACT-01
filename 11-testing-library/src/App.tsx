import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<>
			<Navigation />

			<Container className="py-4">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />

					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
