import { useState} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { searchByDate } from "../services/HackerNewsAPI";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);  // fix me
	//const queryRef = useRef("");//does not trigger rerender, great to save stuff that will not update state
	const [query, setQuery] = useState("");


	const searchHackerNews = async (searchQuery: string) => {
		setError(false)
		setIsLoading(true)
		setSearchResult(null)
		//save searchQuery to queryRef
		// queryRef.current = searchQuery;
		setQuery(searchQuery);

		try{
			const data = await searchByDate(searchQuery)
			setSearchResult(data)

		} catch (err) {
			console.error(`Error thrown when searching for "${searchQuery}":`, err);
			setError(err instanceof Error ? err.message : "stop throwing things that are not error")
		}

		setIsLoading(false)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// prevent smol searches
		const trimmedSearchInput = inputSearch.trim()

		if(trimmedSearchInput.length < 2){
			alert("too short")
			return;
		}

		// search for haxx0rs 🕵
		console.log(`Would search for "${inputSearch}" in HN API`);
		searchHackerNews(trimmedSearchInput);
	}

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						type="text"
						value={inputSearch}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{error && <Alert variant="warning">{error}</Alert>}

			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} target="_blank" key={hit.objectID}>
								<h2 className="h3">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button variant="primary">Previous Page</Button>
						</div>

						<div className="page">PAGE</div>

						<div className="next">
							<Button variant="primary">Next Page</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchPage;
