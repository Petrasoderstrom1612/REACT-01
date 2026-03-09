import "./assets/App.scss";
import './App.css'
import { useState } from 'react';

function App() {
  //let counter = 0; stateless value, react does not observe its value, it does not react to it
  const [counter, setCounter] = useState(0)
  const [msg, setMsg] = useState("Hi mum!")
    const [posts, setPosts] = useState([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state? 🚓", likes: 3 },
	]); //inferred type
  
  const handleBtnClick = () => {
	  console.log("counter before increase",counter)
	  // counter++ = variabel kommer öka men sidan kommer inte renderas om - you cannot do counter++ as the destructured state is const, 
	  // setCounter(counter++) means counter + 1 and you are once again trying to reassign a const, consider it an advanced type
	  setCounter(counter + 1) //den här tryggar omrendering, men  den görs efteråt (React lägger på kö alla state uppdateringar och omrenderar så har du console.log inuti denna function kommer den inte visa det aktuella värdet. Omrenderingen kommer rendera om allt förutom funktionen (egentligen det som ändrades - där staten används), rätt värde kommer därför visas på console.log utanför funktionen och uppdaterat värde kommer synas i JSX)
	  //counter++;
	  console.log("counter after increase",counter)
	  // console.log(msg)
	}
	
	console.log("App is rendering, counter is:", counter);
	
	return (
	<div className="container">
		<ul>
			{posts.map(post =><li key={post.id}>{post.title}</li>)}
		</ul>
		<hr/>
		<p>Counter: {counter}</p>
		<button onClick={handleBtnClick} className="btn btn-primary">Click me</button>
		<hr/>
		<p>{msg}</p>
		<button className="btn btn-warning" onClick={()=>{setMsg("Hi dad!")}}>Hi dad?</button> {/* The yellow paranthese is empty as you are not passing in an argument. You do not need the yellow curlies. */}
	</div>
  )
}

export default App;


//   const [counter, setCounter] = useState(0)
//   const [msg, setMsg] = useState("hi mum")
  // const [posts, setPosts] = useState<{ id: number; title: string; content: string}[]>([])
//   const [salary, setSalary] = useState(10)
//   const [showSalary, setShowSalary] = useState(false);