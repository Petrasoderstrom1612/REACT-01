import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";
// import { ThemeContext } from "../contexts/ThemeContext";
import useTheme from "../../hooks/useTheme";


const Navigation = () => {
	// const themeContext = useTheme()
	const {isDarkMode, toggleTheme} = useTheme() //can be destructured

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
					</Nav>
				<Button onClick={() => toggleTheme}>{isDarkMode ? "Dark⚫" : "Light⬜"}</Button>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
