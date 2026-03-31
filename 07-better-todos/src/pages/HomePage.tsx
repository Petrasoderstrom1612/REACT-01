import { Link } from "react-router";

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>
			<p>Because when your life is on fire 🔥, you need a <Link to="/todos">todo list</Link>.</p> {/* will ensure the side does not rerender, is the same as <a> in html */}          
		</>
	)
}

export default HomePage;
