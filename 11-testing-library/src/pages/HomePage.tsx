import { Link } from "react-router";

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Testing Simple Todos!</h1>

			<p>Because when your life is on fire 🔥, you need a <Link to="/todos">todo list</Link>.</p>
		</>
	)
}

export default HomePage;
