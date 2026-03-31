import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface SearchCityProps {
	onSearch: (location: string) => void;
}

const SearchCity: React.FC<SearchCityProps> = ({ onSearch }) => {
	const [city, setCity] = useState("");

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Pass input to parent component (App)
		onSearch(city.trim());

		// Clear input
		setCity("");
	}

	return (
		<div id="search-wrapper">
			<Form onSubmit={handleSubmit} id="search-form">

				<InputGroup className="mb-3">
					<Form.Control
						type="text"
						placeholder="Enter city to search for"
						aria-label="City"
						aria-details="Search for city to show current weather for."
						onChange={(e) => setCity(e.target.value)}
						value={city}
						minLength={3}
						required
					/>
					<Button
						disabled={city.trim().length < 3}
						type="submit"
						variant="success"
					>
						🔍
					</Button>
				</InputGroup>
			</Form>
		</div>
	);
};

export default SearchCity;
