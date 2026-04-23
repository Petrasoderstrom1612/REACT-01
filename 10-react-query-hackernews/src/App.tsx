import clsx from "clsx";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import useTheme from "./hooks/useTheme";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
	const { isDarkMode } = useTheme();

	const appCssClasses = clsx({
		"bg-white": !isDarkMode,
		"text-dark": !isDarkMode,
	});
	// console.log("appCssClasses:", appCssClasses);

	return (
		<div id="App" className={appCssClasses}>
			<Navigation />

			<Container className="py-4">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ToastContainer
				autoClose={3000}
				closeOnClick={true}
				limit={5}
				newestOnTop={true}
				position="top-right"
				// stacked={true}
				theme="colored"
			/>
			<ReactQueryDevtools	/>
		</div>
	);
}

export default App;
