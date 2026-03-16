import "./assets/App.scss";
import './App.css'
import { useState } from 'react';
import { FcFullTrash } from "react-icons/fc";
import Counter from "./Counter";

type Post = {
	id: number,
	title: string,
	likes: number,
	liked? : boolean
}

function App() {
  //let counter = 0; stateless value, react does not observe its value, it does not react to it
	//const [counter, setCounter] = useState(0)
	const [msg, setMsg] = useState("Hi mum!")
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state? 🚓", likes: 3 },
	]); 
	const [salary, setSalary] = useState(10)
	const [showSalary, setShowSalary] = useState(true)
	const [salaryBenchmark, setSalaryBenchmark] = useState(false)
	const [inputTitle, setInputTitle] = useState("")

  
//   const handleBtnClick = () => {
// 	  console.log("counter before increase",counter)
// 	  // counter++ = variabel kommer öka men sidan kommer inte renderas om - you cannot do counter++ as the destructured state is const, 
// 	  // setCounter(counter++) means counter + 1 and you are once again trying to reassign a const, consider it an advanced type
// 	  setCounter(counter + 1) //den här tryggar omrendering, men  den görs efteråt (React lägger på kö alla state uppdateringar och omrenderar så har du console.log inuti denna function kommer den inte visa det aktuella värdet. Omrenderingen kommer rendera om allt förutom funktionen (egentligen det som ändrades - där staten används), rätt värde kommer därför visas på console.log utanför funktionen och uppdaterat värde kommer synas i JSX)
// 	  //counter++;
// 	  console.log("counter after increase",counter)
// 	  // console.log(msg)
// 	}
	
// 	console.log("App is rendering, counter is:", counter);

 	console.log("App is rendering");

	const handleSalary = (nr: number) => {
		if (salary + nr < 5){
			// setSalary(5)
			setSalaryBenchmark(true)
			return //so you skip else and do not read more code in this function
		}

		setSalaryBenchmark(false)
		setSalary(prev=>prev + nr)
		setSalaryBenchmark(salary + nr <= 5)

	}

	const removePost = (clickedId: number) => { //always better to compare primitives, you can send clickedPost: Post (but it is not the best practise)
		console.log(clickedId)
		setPosts(prevPosts => prevPosts.filter(post => post.id !== clickedId ))
	}

	// const removePost = (post: Post) => {
	// 	const postToKeep = posts.filter(p => p !== post) FILTER is a method that creates clone
	// 	setPosts(postToKeep) //here you assign to a new variable so you do not need ...posts
	// }

	const handleLike = (clickedId: number) => { //always better to compare primitives, you can send clickedPost: Post (but it is not the best practise)
		setPosts(prevPosts => prevPosts.map(post => 
			post.id === clickedId ? {...post, likes : post.liked ? post.likes -1 : post.likes +1, liked: !post.liked }: post
		))
	}


	// const handleLike  = (post: Post) => {
	// 	console.log(post)
	// 	post.likes++
	// 	setPosts([...posts])
	// }

	const addAPost = () => {
		if (!inputTitle) return;

		const highestId = Math.max(...posts.map(post => post.id))
		setPosts(prevPosts => [...prevPosts, { id: highestId + 1, title: inputTitle, likes: 0, liked: false }]
		)
		
		setInputTitle("")
	}
	
	return (
		<div className="container">
		{/* COUNTERS */}
		<Counter/>
		<Counter/>

		{/* SALARY */}
		<button 
		onClick={() => setShowSalary(!showSalary)}
		className={showSalary ? "btn btn-success mb-4" : "btn btn-danger mb-4"}
		>
			{showSalary ? "Hide" : "Show"}</button>
		{showSalary && (
		<>
			<h1>Salary</h1>
			{salary < 10 && <p>You are broke.</p>}
			<p>{salary} SEK</p>
			<button onClick={() => handleSalary(+1)} className="btn btn-primary">+1</button>
			<button onClick={() => handleSalary(-1)} className="btn btn-warning" disabled={salary <= 5}>-1</button>
			<button onClick={() => handleSalary(+5)} className="btn btn-primary">+5</button>
			<button onClick={() => handleSalary(-5)} className="btn btn-warning" disabled={salaryBenchmark}>-5</button>
			<hr/>
		</>
		)}
		{/* POSTS */}
		{ posts.length === 0 ? (<p>No posts</p>) : (
		<ul>
			{posts.map(post =>
			<li key={post.id} data-id={post.id}>{post.title} ({post.likes} likes)
				<button title="lika" 
					onClick={() => handleLike(post.id)} 
					className={post.liked? "btn btn-danger btn-sm ms-1" : "btn btn-primary btn-sm ms-1"}>❤️
				</button>
				<button title="trash-bin" 
					onClick={() => removePost(post.id)} className="btn btn-danger"><FcFullTrash />
				</button>
			</li>)}
		</ul>
		)}
		
		<input title="post" placeholder="Write your post here" onChange={(e)=> setInputTitle(e.target.value)} value={inputTitle}/>
		<button onClick={addAPost} disabled={!inputTitle}>Add post</button>
		<hr/>
		<p>{msg}</p>

	{/* HI DAD MSG */}
		<button className="btn btn-warning" onClick={()=>{setMsg("Hi dad!")}}>Hi dad?</button> {/* You do not need the yellow curlies. */}
	</div>
  )
}

export default App;


//   const [counter, setCounter] = useState(0)
//   const [msg, setMsg] = useState("hi mum")
  // const [posts, setPosts] = useState<{ id: number; title: string; content: string}[]>([])
//   const [salary, setSalary] = useState(10)
//   const [showSalary, setShowSalary] = useState(false);