import Button from "react-bootstrap/Button";
import { Link } from "react-router";
// import { useContext } from "react";
// import { ThemeContext } from "../contexts/ThemeContext";
import useTheme from "../hooks/useTheme";

const HomePage = () => {
	const themeContext = useTheme()
	// const themeContext = useContext(ThemeContext) //T from contract


	return (
		<>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is {themeContext.isDarkMode ? "Dark⚫" : "Light⬜"}</p>

			<Button onClick={() => themeContext.toggleTheme()} variant="secondary">Change theme</Button>
			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	)
}

export default HomePage;
