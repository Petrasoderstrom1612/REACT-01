import { useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import type { CurrentWeatherData } from "./services/OWMAPI.types";
import "./assets/scss/App.scss";
import { Alert } from "react-bootstrap";
import imgAirplane from "./assets/images/747.svg"

function App() {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
	const [error, setError] = useState<string| false>(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = async (location: string) => {
		console.log("Someone wants the current weather in:", location);

		setCurrentWeather(null) //the old weather disappears while loading
		setError(false); //remove old error if any so it does not show
		setIsLoading(true);

		try{
			// Call API and ask for weather in `location`
			const data = await getCurrentWeather(location);
			// Update current weather state with the weather at `location`
			setCurrentWeather(data);
		} catch (err) {
			setError("Something went wrong")
			if (err instanceof Error) { //error is instance of Error class for all errors
				setError(err.message)
			} else {
				setError("This should never happend")
			}
		} finally { //you can skip finally and just have it below try catch
			setIsLoading(false)
		}

	}

	return (
		<Container id="app">
			<SearchCity onSearch={handleSearch} />
			{error && <Alert variant="danger">{error}</Alert>}

			{currentWeather && <CurrentWeather data={currentWeather} />}

			{isLoading && <Image src={imgAirplane} className="py-5 w-75" fluid/>}
		</Container>
	);
}

export default App;
