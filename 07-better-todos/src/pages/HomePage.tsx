import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router";
import {toast} from "react-toastify"

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>
			<p>Because when your life is on fire 🔥, you need a 
			<Link to="/todos">todo list</Link>.</p> {/* will ensure the side does not rerender, is the same as <a> in html */}          
		
			<ButtonGroup>
				<Button variant="primary" onClick={() => toast("Wow, such success, very influencer, much money 💰🤩")}>Celebrate 🎉</Button>

				<Button variant="success" onClick={() => toast.success("Wow, such success, very influencer, much money! 💰", 
				{ icon: () => "🚀" })}>Click me 🤑</Button> {/* icon on the left */}	
				

				<Button variant="warning" onClick={() => toast.warn("Wow, such WARNING, very ALERT!")}>Call da police 👮🏻</Button>

				<Button variant="danger" onClick={() => toast.error("Wow, such ERROR, very DANGEROUS!")}>Blow shit up 💣</Button>

				<Button variant="info" onClick={() => toast.info("LIKE && SUBSCRIBE")}>Fire that ship 🔥</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
