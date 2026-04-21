import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import useTheme from "../hooks/useTheme";

const HomePage = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<>
			<h1>Welcome to Hacker News (React Query edition) 🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is: {isDarkMode ? "Dark 🌖" : "Light ☀️"}</p>

			<Button onClick={() => toggleTheme()} variant="secondary">
				Change theme
			</Button>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	)
}

export default HomePage;
