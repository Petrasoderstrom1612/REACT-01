import './App.css'
// import React from "react"
import { useState } from 'react';
import "./assets/App.scss";

function App() {
  //const counter = 0; stateless value, react does not observe its value, it does not react to it
  const [counter, setCounter] = useState(0)
  const [msg, setMsg] = useState("hi mum")
  // const [posts, setPosts] = useState<{ id: number; title: string; content: string}[]>([])
  const [posts, setPosts] = useState([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state? 🚓", likes: 3 },
	]);
  const [salary, setSalary] = useState(10)
  const [showSalary, setShowSalary] = useState(false);


  const handleBtnClick = () => {
    console.log("stop it")
    // counter++ = variabel kommer öka men sidan kommer inte renderas om - you cannot do counter++ as the destructured state is const, 
    // setCounter(counter++) means counter + 1 and you are once again trying to reassign a const, consider it an advanced type
    setCounter(counter + 1) //den här tryggar omrendering, men har du console.log() så kommer den göras efteråt (React lägger på kö alla state uppdateringar och omrenderar)
    console.log(counter)
    console.log(msg)
  }

  	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
      setSalary(5);
			return;
		}
    
    setSalary(prev => prev + amount);
	}

	console.log("App is rendering, counter is:", counter);

  return (
		<div className="container py-2">
    <div className="counter">
			<p>Counter: {counter}</p>

			<button className="btn btn-primary" onClick={handleBtnClick}>Click me!</button>
		</div>
			<h1>02-react-basics</h1>

			<h2>Counters</h2>

			<hr />

			<p>{msg}</p>

			<button className="btn btn-warning" onClick={ () => setMsg("Hi dad!") }>Hi dad?</button>

			<hr />

			<button
				className={showSalary
					? "btn btn-success mb-4"
					: "btn btn-danger mb-4"
				}
				onClick={() => setShowSalary(!showSalary)} //toggle
			>
				{showSalary ? "Hide" : "Show"} salary
			</button>

			{showSalary && (
				<>
					<h2>Salary</h2>

					<p>Salary per hour: {salary} &euro;</p>

					{salary < 10 && (
						<div className="alert alert-warning">
							You might want to change job?
						</div>
					)}

					<div className="buttons">
						<div className="mb-1">
							<button
								className="btn btn-primary btn-lg"
								onClick={() => handleChangeSalary(1)}
							>
								Raise 1 &euro; 🤑
							</button>
							<button
								className="btn btn-warning btn-lg"
								disabled={salary === 5}
								onClick={() => handleChangeSalary(-1)}
							>
								Decrease 1 &euro; 😢
							</button>
						</div>

						<div className="mb-1">
							<button
								className="btn btn-primary btn-lg"
								onClick={() => handleChangeSalary(5)}
							>
								Raise 5 &euro; 🤑🤑🤑
							</button>
							<button
								className="btn btn-warning btn-lg"
								disabled={salary === 5}
								onClick={() => handleChangeSalary(-5)}
							>
								Decrease 5 &euro; 😢😢😢
							</button>
						</div>
					</div>
				</>
			)}

			<hr />

			<h2>Posts</h2>

			<ul>
				{posts.map(post =>
					<li key={post.id}>{post.title} ({post.likes} likes)</li>
				)}
			</ul>
		</div>
	);
}

export default App;

