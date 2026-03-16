import "./assets/App.scss";
import './App.css'
import { useRef, useState } from 'react';
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
	const inputPostTitleRef = useRef<HTMLInputElement|null>(null) //you need to declare it as null since the code reads from top to bottom otherwise it would crash at the JSX does not exist yet on this row
																  //the value is first null until the browser comes to the JSX part and reads it so you have to have both types the html one and the null45
  
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

		const highestId = Math.max(0, ...posts.map(post => post.id)) //mappingen will return a new array with numbers [1,2,3], you must have default 0 because otherwise max of null is infinity for no posts and infinity + 1 is still negative infinity which will always create you same number and fail the moment you delete all posts and then create 2 new.
		setPosts(prevPosts => [...prevPosts, { id: highestId + 1, title: inputTitle, likes: 0, liked: false }]
		)
		
		setInputTitle("")
	}
	
	const handleFormSubmit = (e: React.SubmitEvent) => {
		console.log(e.preventDefault) //avoid page rerender - default behavior of form when it submits
		e.preventDefault()

		if(!inputPostTitleRef.current) return //not the value only the current? is kind of demanding the question mark, if you would go all the way to value it would crash null.value ❌
		const postValue = inputPostTitleRef.current.value

		const newPost: Post = {
			title: postValue,
			likes: 0,
			liked: false,
			id: Math.max(0, ...posts.map(post => post.id + 1))
		}
		
		console.log(newPost)
		setPosts(prevPosts => [...prevPosts, newPost])
	}

	//console.log("input value",inputPostTitleRef) //first it it null but if you click on some button to rerender the app, it will get a new value current: input.form-control
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

		<div className="input-group mb-3">{/* this className ensures everything is on the same row */}
			<input title="post" placeholder="Write your post here" className="form-control" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setInputTitle(e.target.value)} value={inputTitle}/>{/* full width */}
			<button onClick={addAPost} disabled={!inputTitle}>Add post</button>
		</div>

		<form onSubmit={handleFormSubmit}>
			<div className="input-group mb-3">
				<input
					className="form-control"
					type="text"
					placeholder="this is my post"
					aria-label="post"
					required
					title="post"
					ref={inputPostTitleRef}
				/>
				<button
					className="btn btn-success btn-sm ms-1"
					type="submit"
				>
					Create
				</button>
			</div>
		</form>

	{/* HI DAD MSG */}
		<hr/>
		<p>{msg}</p>
		<button className="btn btn-warning" onClick={()=>{setMsg("Hi dad!")}}>Hi dad?</button> {/* You do not need the yellow curlies. */}
	</div>
  )
}

export default App;