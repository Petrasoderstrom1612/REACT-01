// import { useContext } from "react";
import clsx from "clsx";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
// import { ThemeContext } from "./contexts/ThemeContext";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import useTheme from "./hooks/useTheme";

function App() {
const {isDarkMode} = useTheme() 

const appCssClasses = clsx({
	"bg-white": !isDarkMode, //bg-white true
	"text-dark": !isDarkMode, //text-black true
})

console.log(appCssClasses)

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
		</div>
	);
}

export default App;
