import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import { searchByDate } from "../services/HackerNewsAPI";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const inputSearchRef = useRef<HTMLInputElement>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query=` from URL
	const searchParamsQuery = searchParams.get("query");  // /search?query=tesla
	console.log("searchParamsQuery:", searchParamsQuery);

	const searchHackerNews = async (searchQuery: string, searchPage: number) => {
		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);

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
		setSearchParams({ query: trimmedSearchInput });
	}

	useEffect(() => {
		if (!searchParamsQuery) {
			return;
		}

		// eslint-disable-next-line react-hooks/set-state-in-effect
		searchHackerNews(searchParamsQuery, 0);
		setInputSearch(searchParamsQuery);
	}, [searchParamsQuery]);

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

			{searchParamsQuery && searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{searchParamsQuery}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} target="_blank" key={hit.objectID}>
								<h2 className="h3">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						hasNextPage={searchResult.page + 1 < searchResult.nbPages}
						hasPreviousPage={searchResult.page > 0}
						onNextPage={() => searchHackerNews(searchParamsQuery, searchResult.page + 1)}
						onPreviousPage={() => searchHackerNews(searchParamsQuery, searchResult.page - 1)}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>

					{/* <div className="d-flex justify-content-between align-items-center">
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
					</div> */}
				</div>
			)}
		</>
	);
};

export default SearchPage;
