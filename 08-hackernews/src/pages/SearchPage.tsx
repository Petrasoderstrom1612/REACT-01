import { useEffect, useRef, useState } from "react";
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
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const [query, setQuery] = useState("");
	const inputSearchRef = useRef<HTMLInputElement>(null);

	const searchHackerNews = async (searchQuery: string, searchPage: number) => {
		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);

		// save searchQuery to queryRef
		setQuery(searchQuery); //so it is actively shown in the Search results for Apple... on the page

		try {
			// search
			const data = await searchByDate(searchQuery, searchPage);

			// update state with search result
			setSearchResult(data);

		} catch (err) {
			// handle errors
			console.error(`Error thrown when searching for "${searchQuery}":`, err);
			setError(err instanceof Error ? err.message : "Stop throwing things that are not Errors!!!11");
		}

		setIsLoading(false);
	}

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		// 💇 trim the input
		const trimmedSearchInput = inputSearch.trim();

		// prevent smol searches
		if (trimmedSearchInput.length < 2) {
			alert("Too short search query!");
			return;
		}

		// search for haxx0rs 🕵
		searchHackerNews(trimmedSearchInput, 0);
	}

	useEffect(() => {
		if (!inputSearchRef.current) {
			return;
		}

		// 👀
		inputSearchRef.current.focus();
	}, []);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						ref={inputSearchRef}
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
							<Button
								disabled={searchResult.page === 0}
								onClick={() => searchHackerNews(query, searchResult.page - 1)}
								variant="primary"
							>Previous Page</Button>
						</div>

						<div className="page">
							{searchResult.page + 1} / {searchResult.nbPages}
						</div>

						<div className="next">
							<Button
								disabled={searchResult.page + 1 === searchResult.nbPages}
								onClick={() => searchHackerNews(query, searchResult.page + 1)}
								variant="primary"
							>Next Page</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchPage;
