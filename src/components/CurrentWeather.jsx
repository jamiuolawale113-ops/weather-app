import { FiMapPin, FiWind, FiCloudRain, FiSmile } from "react-icons/fi";
import { getWeatherDescription } from "../utils/weatherUtils";

function CurrentWeather({ weather, locationName }) {
  const temperature = weather ? Math.round(weather.temperature_2m) : 26;
  const feelsLike = weather ? Math.round(weather.apparent_temperature) : 22;
  const windSpeed = weather ? Math.round(weather.wind_speed_10m) : 24;
  const condition = weather ? getWeatherDescription(weather.weather_code) : "Overcast";
  const displayLocation = locationName || (weather ? "Lagos, Nigeria" : "London, UK");

  return (
    <section className="current-weather">
      <div className="sect-title">
        <FiCloudRain />
        <p>Current Weather Status</p>
      </div>

      <div className="temperature">
        <h1>{temperature}&deg;C</h1>
        <p>{condition}</p>
      </div>

      <div className="weather-summary">
        <div>
          <FiMapPin />
          <strong>{displayLocation}</strong>
          <span>Location</span>
        </div>

        <div>
          <FiWind />
          <strong>{windSpeed} km/h</strong>
          <span>Wind</span>
        </div>

        <div>
          <FiSmile />
          <strong>{feelsLike}&deg;C</strong>
          <span>Feels like</span>
        </div>

        <div>
          <FiCloudRain />
          <strong>{condition}</strong>
          <span>Condition</span>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
