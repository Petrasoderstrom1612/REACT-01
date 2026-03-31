import Card from "react-bootstrap/Card";
import imgBanner from "../assets/images/banner.png";
import type { CurrentWeatherData } from "../services/OWMAPI.types";

interface CurrentWeatherProps {
	data: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
	return (
		<div id="current-weather">
			<Card>
				<img src={imgBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>, <span id="country">{data.sys.country}</span>
					</h5>

					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					{/*
					<ul className="conditions">
						<li><img src="" title="CONDITION_MAIN" alt="CONDITION_MAIN">CONDITION_DESCRIPTION</li>
					</ul>

					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
					*/}
				</div>
			</Card>
		</div>
	);
};

export default CurrentWeather;
